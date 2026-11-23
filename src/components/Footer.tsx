import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/brand-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <section id="contact" className="scroll-mt-24">
          <Card className="overflow-hidden border-border/80 shadow-sm">
            <CardHeader className="border-b bg-muted/40">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-1">
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                    <Mail className="size-5 text-brand" />
                    Let&apos;s Connect
                  </CardTitle>
                  <CardDescription>
                    Have a project in mind, a complex system to design, or just want to say hello? Reach out below or connect directly.
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href="https://www.linkedin.com/in/george-h-gittins/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedInIcon className="size-4" />
                      LinkedIn
                      <ExternalLink className="size-3 opacity-60" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href="https://github.com/GeorgeGitHubbins"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                    >
                      <GitHubIcon className="size-4" />
                      GitHub
                      <ExternalLink className="size-3 opacity-60" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mx-auto flex justify-center overflow-hidden rounded-lg border bg-white">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdAF8z6BYhucXHl_oRF5kz4H2aHlpwQqe2abNNmvd7F5S2hAg/viewform?embedded=true"
                  width="640"
                  height="585"
                  title="Contact Form"
                  className="w-full max-w-[640px] border-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals allow-storage-access-by-user-activation"
                >
                  Loading…
                </iframe>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} George Gittins. Built with React, Tailwind &amp; shadcn/ui.
          </p>
          <p className="text-xs opacity-80">
            Last updated:{' '}
            {new Date(__BUILD_DATE__).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
