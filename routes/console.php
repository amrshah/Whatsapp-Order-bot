<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('billing:generate-invoices')->dailyAt('00:00');
