'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeCheck, Briefcase } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { useLoginMutation } from '@/hooks/use-auth';
import { DEMO_LOGIN_EMAIL, DEMO_LOGIN_PASSWORD } from '@/lib/auth/demo-credentials';
import { Link, useRouter } from '@/i18n/routing';
import { FieldError } from '@/components/ui/field-error';
import { FieldRequiredIndicator } from '@/components/ui/field-required-indicator';
import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils';

type LoginFormLabels = {
  email: string;
  password: string;
  forgot: string;
  login: string;
  loggingIn: string;
  benefitsTitle: string;
  benefit1: string;
  benefit2: string;
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMin: string;
  formAriaLabel: string;
  required: string;
  errorSummaryTitle: string;
  errorSummary: string;
  showPassword: string;
  hidePassword: string;
  fieldComplete: string;
};

type LoginFormProps = {
  labels: LoginFormLabels;
};

function getDescribedBy(hasError: boolean, errorId: string) {
  return hasError ? errorId : undefined;
}

export function LoginForm({ labels }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showValidationSummary, setShowValidationSummary] = useState(false);

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().min(1, labels.emailRequired).email(labels.emailInvalid),
        password: z.string().min(1, labels.passwordRequired).min(8, labels.passwordMin),
      }),
    [labels]
  );

  type LoginFormValues = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: DEMO_LOGIN_EMAIL,
      password: DEMO_LOGIN_PASSWORD,
    },
  });

  useEffect(() => {
    const lastEmail = sessionStorage.getItem('lastEmail');
    if (lastEmail) {
      setValue('email', lastEmail);
    }
  }, [setValue]);

  const email = watch('email');
  const password = watch('password');
  const emailComplete = loginSchema.shape.email.safeParse(email).success;
  const passwordComplete = loginSchema.shape.password.safeParse(password).success;

  const { mutate: login, isPending } = useLoginMutation();

  const onSubmit = (values: LoginFormValues) => {
    setShowValidationSummary(false);
    sessionStorage.setItem('lastEmail', values.email);

    login(values, {
      onSuccess: () => {
        const redirectTo = searchParams.get('redirectTo');
        router.push(
          redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//') ? redirectTo : '/jobs'
        );
      },
    });
  };

  const onInvalid = (fieldErrors: FieldErrors<LoginFormValues>) => {
    setShowValidationSummary(true);

    if (fieldErrors.email) {
      setFocus('email');
      return;
    }

    if (fieldErrors.password) {
      setFocus('password');
    }
  };

  const validationSummaryId = 'login-validation-summary';
  const hasFieldErrors = Boolean(errors.email || errors.password);

  return (
    <form
      className="space-y-4"
      noValidate
      aria-label={labels.formAriaLabel}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      {showValidationSummary && isSubmitted && hasFieldErrors && (
        <div
          id={validationSummaryId}
          role="alert"
          aria-live="assertive"
          className="rounded-none border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
        >
          <p className="font-medium">{labels.errorSummaryTitle}</p>
          <p className="mt-1">{labels.errorSummary}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errors.email?.message && <li>{errors.email.message}</li>}
            {errors.password?.message && <li>{errors.password.message}</li>}
          </ul>
        </div>
      )}

      <div className="gov-field">
        <label htmlFor="email" className="text-sm font-medium">
          {labels.email}
          <FieldRequiredIndicator
            complete={emailComplete}
            requiredLabel={labels.required}
            completeLabel={labels.fieldComplete}
          />
        </label>
        <div className="gov-input-wrap">
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={getDescribedBy(Boolean(errors.email), 'email-error')}
            className={cn(
              'gov-input h-12 w-full rounded-lg px-4 text-base',
              errors.email ? 'border-destructive' : undefined
            )}
            {...register('email')}
          />
        </div>
        {errors.email?.message && <FieldError id="email-error" message={errors.email.message} />}
      </div>

      <div className="gov-field">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="password" className="text-sm font-medium">
            {labels.password}
            <FieldRequiredIndicator
              complete={passwordComplete}
              requiredLabel={labels.required}
              completeLabel={labels.fieldComplete}
            />
          </label>
          <Link href="/forgot-password" className="gov-link text-sm font-medium">
            {labels.forgot}
          </Link>
        </div>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          aria-required="true"
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={getDescribedBy(Boolean(errors.password), 'password-error')}
          showPasswordLabel={labels.showPassword}
          hidePasswordLabel={labels.hidePassword}
          className={errors.password ? 'border-destructive' : undefined}
          {...register('password')}
        />
        {errors.password?.message && (
          <FieldError id="password-error" message={errors.password.message} />
        )}
      </div>

      <button
        type="submit"
        className="gov-primary-button h-11 w-full text-sm font-medium"
        aria-busy={isPending}
        disabled={isPending}
      >
        {isPending ? labels.loggingIn : labels.login}
      </button>

      <div className="rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{labels.benefitsTitle}</p>
        <ul className="mt-2 space-y-2">
          <li className="flex gap-2">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {labels.benefit1}
          </li>
          <li className="flex gap-2">
            <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {labels.benefit2}
          </li>
        </ul>
      </div>
    </form>
  );
}
