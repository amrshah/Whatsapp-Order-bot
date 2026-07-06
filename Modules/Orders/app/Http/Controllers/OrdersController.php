<?php

namespace Modules\Orders\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = \Modules\Orders\Models\Order::whereIn('status', ['Pending', 'Preparing', 'Ready'])
            ->orderBy('created_at', 'asc')
            ->get();

        return \Inertia\Inertia::render('Orders/Kds', [
            'orders' => $orders,
            'tenantId' => tenant('id')
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Preparing,Ready,Delivered'
        ]);

        $order = \Modules\Orders\Models\Order::findOrFail($id);
        $order->update(['status' => $request->status]);

        try {
            broadcast(new \App\Events\OrderStatusUpdated($order, tenant('id')));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::warning("Could not broadcast OrderStatusUpdated event. Reverb might be down: " . $e->getMessage());
        }

        return redirect()->back();
    }

    public function create()
    {
        $categories = \Modules\Menu\Models\Category::with(['products' => function($q) {
            $q->where('is_active', true);
        }])->where('is_active', true)->get();

        return \Inertia\Inertia::render('Orders/Pos', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'table_number' => 'nullable|string',
            'customer_phone' => 'nullable|string',
            'customer_name' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'total_amount' => 'required|numeric'
        ]);

        $order = \Modules\Orders\Models\Order::create([
            'order_number' => 'ORD-' . strtoupper(uniqid()),
            'table_number' => $request->table_number,
            'customer_phone' => $request->customer_phone,
            'customer_name' => $request->customer_name ?? 'POS Customer',
            'total_amount' => $request->total_amount,
            'status' => 'Pending',
            'order_type' => 'POS'
        ]);

        foreach ($request->items as $item) {
            $product = \Modules\Menu\Models\Product::find($item['product_id']);
            if ($product) {
                \Modules\Orders\Models\OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $product->price * $item['quantity']
                ]);
            }
        }

        if ($request->customer_phone) {
            $customer = \Modules\Crm\Models\Customer::firstOrCreate(
                ['phone' => $request->customer_phone]
            );
            $customer->name = $request->customer_name ?? $customer->name;
            $customer->total_orders += 1;
            $customer->total_spent += $request->total_amount;
            $customer->last_order_date = now();
            $customer->save();
        }

        broadcast(new \App\Events\OrderCreated($order->load('items.product'), tenant('id')));

        return redirect()->route('orders.create')->with('success', 'Order placed successfully!');
    }

    public function history()
    {
        $orders = \Modules\Orders\Models\Order::where('status', 'Delivered')
            ->orderBy('updated_at', 'desc')
            ->paginate(15);

        return \Inertia\Inertia::render('Orders/History', [
            'orders' => $orders
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}
}
