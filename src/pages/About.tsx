import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import headshotImg from '../assets/George_profile.webp';
import Skills from '../components/Skills';
import CareerAssistant from '../components/CareerAssistant';
import CanvasVisual from '../components/CanvasVisual';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const highlights = [
  {
    icon: Briefcase,
    label: 'Current Role',
    title: 'Data Science Consultant',
    detail: 'Sia Partners · Infrastructure, energy & agentic AI systems',
    to: '/experience',
  },
  {
    icon: GraduationCap,
    label: 'Academic Foundation',
    title: 'MSc Complex Systems',
    detail: 'TU Delft (CoSEM) · Data, Information & Communication',
    to: '/education',
  },
  {
    icon: Layers,
    label: 'Ventures & Impact',
    title: 'Builder & Community Lead',
    detail: 'InstantFlows Co-Founder · NGO Link · Global Shapers The Hague',
    to: '/projects',
  },
];

const About: React.FC = () => {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section id="about" className="relative">
        <Card className="relative overflow-hidden border-border/80 bg-card/85 py-0 shadow-sm">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <CanvasVisual />
          </div>
          <div className="relative z-10 flex flex-col-reverse items-center gap-8 p-6 sm:p-10 md:flex-row md:items-center md:gap-10">
            <div className="flex flex-1 flex-col items-center gap-5 text-center md:items-start md:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <Badge variant="brand" className="gap-1.5 px-3 py-1">
                  <Sparkles className="size-3" />
                  Data Science Consultant @ Sia Partners
                </Badge>
                <Badge variant="outline" className="gap-1 px-2.5 py-1 text-muted-foreground">
                  <MapPin className="size-3" />
                  Amsterdam / The Hague
                </Badge>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Hi, I&apos;m George Gittins.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Systems engineer and data science consultant passionate about turning complex,
                  multi-stakeholder challenges into clean, data-driven software and agentic AI workflows.
                </p>
              </div>

              <blockquote className="border-l-2 border-brand pl-4 text-sm font-medium italic text-foreground/85 sm:text-base">
                &ldquo;I can make anything you want — you just have to describe it well enough.&rdquo;
              </blockquote>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1 md:justify-start">
                <Button asChild variant="brand" size="lg">
                  <Link to="/projects">
                    Explore Projects
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/experience">
                    <Briefcase className="size-4" />
                    Work Experience
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <a href="#contact">
                    <Mail className="size-4" />
                    Get in Touch
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative shrink-0">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-brand/40 via-brand/10 to-transparent blur-md" />
              <img
                src={headshotImg}
                alt="George Gittins"
                className="relative size-36 rounded-full border-2 border-background object-cover shadow-lg ring-2 ring-brand/30 sm:size-44 md:size-48"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </Card>

        {/* Highlights Bento Strip */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} to={item.to} className="group block">
                <Card className="h-full border-border/80 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-md">
                  <CardContent className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                        {item.label}
                      </span>
                      <Icon className="size-4 text-brand transition-transform group-hover:scale-110" />
                    </div>
                    <h2 className="text-base font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h2>
                    <p className="text-sm leading-snug text-muted-foreground">
                      {item.detail}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-24">
        <Skills />
      </section>

      {/* Career Assistant Section */}
      <section id="career-assistant" className="scroll-mt-24">
        <CareerAssistant />
      </section>
    </div>
  );
};

export default About;
