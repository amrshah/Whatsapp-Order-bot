import React from 'react';

export default function PwaLayout({ children, tenantName }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start">
            {/* Mobile shell container */}
            <div className="w-full max-w-md min-h-screen bg-white shadow-xl flex flex-col relative pb-20">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white font-black shadow-sm">
                            {tenantName ? tenantName.charAt(0).toUpperCase() : 'R'}
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-gray-900 leading-tight">
                                {tenantName || 'Restaurant OS'}
                            </h1>
                            <span className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                Online ordering active
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-600">
                        ⚡ Direct Order
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 flex flex-col">
                    {children}
                </main>
            </div>
        </div>
    );
}
