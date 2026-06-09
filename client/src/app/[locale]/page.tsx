import { useTranslations } from 'next-intl';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Search, Accessibility, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';
import { LangToggle } from '@/components/lang-toggle';

export default function LandingPage() {
  const t = useTranslations('Index');
  const nav = useTranslations('Navigation');

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Accessibility className="h-6 w-6 text-primary" />
            <span className="font-bold tracking-tight">AccessJobs</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">{nav('home')}</Link>
            <Link href="/jobs" className="transition-colors hover:text-primary text-muted-foreground">{nav('jobs')}</Link>
            <Link href="/employers" className="transition-colors hover:text-primary text-muted-foreground">{nav('employers')}</Link>
          </nav>

          <div className="flex items-center gap-4">
            <LangToggle />
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login" className={buttonVariants({ variant: "ghost" })}>{nav('login')}</Link>
              <Link href="/register" className={buttonVariants({ variant: "default" })}>{nav('register')}</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-24 pb-32">
          {/* Decorative background blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                {t('title').split(' ').map((word, i) => 
                  ['người', 'khuyết', 'tật', 'People', 'Disabilities'].includes(word) ? (
                    <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600"> {word} </span>
                  ) : <span key={i}> {word} </span>
                )}
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t('description')}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full group">
                  {t('findJob')}
                  <Search className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full group">
                  {t('postJob')}
                  <Building2 className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('featuresTitle')}</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-background/60 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{t('feature1Title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{t('feature1Desc')}</CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-background/60 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{t('feature2Title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{t('feature2Desc')}</CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-background/60 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-4 text-green-500">
                    <HeartHandshake className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{t('feature3Title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{t('feature3Desc')}</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{t('ctaTitle')}</h2>
            <p className="text-xl text-muted-foreground mb-10">{t('ctaDesc')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className={buttonVariants({ size: "lg", className: "h-12 rounded-full" })}>
                {t('joinAsCandidate')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/register?role=NTD" className={buttonVariants({ size: "lg", variant: "secondary", className: "h-12 rounded-full" })}>
                {t('joinAsEmployer')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4 mx-auto text-center text-muted-foreground">
          <p>© 2024 AccessJobs. Cổng việc làm tiếp cận cho người khuyết tật.</p>
        </div>
      </footer>
    </>
  );
}
