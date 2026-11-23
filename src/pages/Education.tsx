import React from 'react';
import { Calendar, ExternalLink, GraduationCap, MapPin } from 'lucide-react';
import tuDelftLogo from '../assets/TUDelft_Logo.webp';
import uGroningenLogo from '../assets/UniversityofGroningen_logo.webp';
import uPortoLogo from '../assets/UPorto_logo.webp';
import ibLogo from '../assets/InternationalBaccalaureate_logo.webp';
import dataWiseLogo from '../assets/DataWise_logo.webp';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface EducationItem {
  institution: string;
  program: string;
  logo: string;
  date?: string;
  location: string;
  link?: string;
  highlights: string[];
  tags: string[];
}

const educationData: EducationItem[] = [
  {
    institution: 'Technical University of Delft',
    program: 'MSc Complex Systems Engineering and Management (CoSEM)',
    logo: tuDelftLogo,
    date: 'August 2021 – August 2024',
    location: 'Delft, Netherlands',
    link: 'http://cosem.nl',
    highlights: [
      'Project planning, socio-technical design, and systems management',
      'Understanding complex markets, market failures, and strategic positioning',
      'Handling multi-stakeholder, multivariable engineering and policy challenges',
      'Specialization in Data, Information, and Communication',
    ],
    tags: ['Systems Engineering', 'Management', 'Data Specialization'],
  },
  {
    institution: 'University of Porto',
    program: 'ERASMUS+ MSc Industrial Engineering and Management',
    logo: uPortoLogo,
    location: 'Porto, Portugal',
    highlights: [
      'Modeling and Data Analytics for complex industrial operations',
      'Supply Chain Management and Technology Entrepreneurship',
      'Industrial Ecology and Sustainable Operations Strategies',
    ],
    tags: ['Industrial Engineering', 'Modelling', 'Analytics', 'Erasmus+'],
  },
  {
    institution: 'University of Groningen',
    program: 'Minor Data Wise: Data Science in Society',
    logo: dataWiseLogo,
    location: 'Groningen, Netherlands',
    highlights: [
      'Understanding the role of data science, ethics, and societal impact',
      'Collaborated with a partner company to deliver a consulting report on their data architecture and use',
    ],
    tags: ['Data Science', 'Societal Impact', 'Consulting'],
  },
  {
    institution: 'University of Groningen',
    program: 'BSc Industrial Engineering and Management',
    logo: uGroningenLogo,
    location: 'Groningen, Netherlands',
    highlights: [
      'Developed strong programming skills across Python, MATLAB, R, JavaScript, and Excel',
      'Modeled and controlled multivariable dynamic systems',
      'Optimized operations across manufacturing, supply chains, and project management',
    ],
    tags: ['Programming', 'Operations Optimization', 'Multivariable Systems'],
  },
  {
    institution: 'University of Groningen',
    program: 'BSc Chemical Engineering',
    logo: uGroningenLogo,
    location: 'Groningen, Netherlands',
    highlights: [
      'Trained in rigorous analytical and experimental laboratory practices',
      'Studied molecular structure, reactivity, and process engineering fundamentals',
    ],
    tags: ['Laboratory Practice', 'Molecular Chemistry'],
  },
  {
    institution: 'International School of The Hague',
    program: 'International Baccalaureate (IB Diploma)',
    logo: ibLogo,
    location: 'The Hague, Netherlands',
    highlights: [
      'Higher Level: Physics, Chemistry, English Language & Literature',
      'Standard Level: Mathematics, Geography, Dutch Language & Literature',
    ],
    tags: ['Physics', 'Chemistry', 'Mathematics'],
  },
];

const Education: React.FC = () => {
  return (
    <section id="education" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-brand uppercase">
          <GraduationCap className="size-3.5" />
          Academic Background
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Education
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Multidisciplinary engineering training spanning complex systems, industrial operations, data science, and international exchange.
        </p>
      </div>

      <div className="relative flex flex-col gap-4 md:pl-6 md:before:absolute md:before:top-4 md:before:bottom-4 md:before:left-1.5 md:before:w-px md:before:bg-border">
        {educationData.map((edu, index) => (
          <Card
            key={`${edu.institution}-${index}`}
            className="relative py-5 transition-all duration-200 hover:border-brand/50 hover:shadow-md md:before:absolute md:before:top-7 md:before:-left-[23px] md:before:size-2.5 md:before:rounded-full md:before:border-2 md:before:border-background md:before:bg-brand"
          >
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-1.5 shadow-xs">
                <img
                  src={edu.logo}
                  alt={edu.institution}
                  className="size-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2.5">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">
                      {edu.institution}{' '}
                      <span className="font-normal text-muted-foreground">/</span>{' '}
                      <span className="text-brand">{edu.program}</span>
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {edu.date && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-3.5" />
                          {edu.date}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {edu.link && (
                    <Button asChild variant="outline" size="xs" className="w-fit">
                      <a href={edu.link} target="_blank" rel="noopener noreferrer">
                        Program Info
                        <ExternalLink className="size-3" />
                      </a>
                    </Button>
                  )}
                </div>

                <ul className="flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                  {edu.highlights.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {edu.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Education;
