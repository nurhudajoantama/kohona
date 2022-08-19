<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Prepare exception for rendering.
     *
     * @param  \Throwable  $e
     * @return \Throwable
     */
    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);

        if (!app()->environment(['local', 'testing'])) {
            if ($response->isNotFound()) {
                return Inertia::render('Error/Error', ['status' => 404, 'user' => auth()->user()])
                    ->toResponse($request)
                    ->setStatusCode(404);
            } else if ($response->isForbidden()) {
                return Inertia::render('Error/Error', ['status' => 403, 'user' => auth()->user()])
                    ->toResponse($request)
                    ->setStatusCode(403);
            } else if ($response->isServerError()) {
                return Inertia::render('Error/Error', ['status' => 500, 'user' => auth()->user()])
                    ->toResponse($request)
                    ->setStatusCode(500);
            }
        }


        return $response;
    }
}
