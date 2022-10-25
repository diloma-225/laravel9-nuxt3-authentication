<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Carbon;
use App\Mail\EmailVerificationMail;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Config;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        VerifyEmail::createUrlUsing(function ($notifiable) {
            $frontendUrl = env('SPA_URL');

            $verifyUrl = URL::temporarySignedRoute(
                'verification.verify',
                Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                ]
            );
            $url = parse_url($verifyUrl);

            return $frontendUrl.$url['path']."?".$url['query'];
        });

        ResetPassword::createUrlUsing(function($notifiable, $token){
            return url(env('SPA_URL'))."/reset-password/{$token}?email={$notifiable->getEmailForPasswordReset()}";
        });

/*         VerifyEmail::toMailUsing(function($notifiable, $url){
            return new EmailVerificationMail($notifiable, $url);
        }); */

/*         ResetPassword::toMailUsing(function($notifiable, $url){
            return view("test");
        }); */
    }
}
