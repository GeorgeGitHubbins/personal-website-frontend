import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Eye,
  FileText,
  FolderGit2,
  HeartHandshake,
  Search,
  Share2,
  X,
} from 'lucide-react';
import { LinkedInIcon } from '@/components/ui/brand-icons';
import ngoLinkLogo from '../assets/NGOLink_logo.webp';
import globalShapersLogo from '../assets/GlobalShapersTheHague_logo.webp';
import siaLogo from '../assets/SIA_logo.webp';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface TechnicalProject {
  title: string;
  company?: string;
  logo?: string;
  date: string;
  description: string;
  tags: string[];
  link?: string;
  isFuture?: boolean;
  category: 'Infrastructure' | 'AI & Data' | 'System Design' | 'Other';
}

interface AcademicWork {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  category: 'Thesis' | 'Report' | 'Presentation' | 'Simulation';
}

const technicalProjects: TechnicalProject[] = [
  {
    title: 'AI OrgReview Rebuild',
    company: 'Sia Partners',
    logo: siaLogo,
    date: 'July 2026 · Amsterdam',
    description:
      "Led the rebuild of AI OrgReview (published as 'From Exposure to Value: A New Diagnostic for the Agentic Era'), a strategic consulting tool designed to close the gap between generative AI deployment and actual P&L impact. Developed agentic workflows and LLM orchestration to assess organizational readiness and design new workflows across diverse sectors.",
    tags: ['Agentic AI', 'Python', 'Systems Engineering', 'Workflow Design'],
    link: 'https://www.sia-partners.com/en/insights/publications/exposure-value-a-new-diagnostic-agentic-era',
    category: 'AI & Data',
  },
  {
    title: 'NGO Link Infrastructure',
    company: 'NGO Link',
    logo: ngoLinkLogo,
    date: 'July 2025 – Present · The Hague',
    description:
      "Leading the development of the NGO Link platform, connecting NGOs with resources and volunteers. Building the core infrastructure and features to scale the project's community impact.",
    tags: ['React', 'TypeScript', 'Architecture'],
    link: 'https://www.ngo-link.org',
    category: 'Infrastructure',
  },
  {
    title: 'Personal Website & Autonomous CI/CD',
    date: 'Continuous Development',
    description:
      'A React, TypeScript, Tailwind, and shadcn/ui portfolio hosted on AWS S3 and served globally via CloudFront, featuring an autonomous improvement workflow.',
    tags: ['React', 'TypeScript', 'AWS', 'CI/CD'],
    category: 'Infrastructure',
  },
  {
    title: 'Future Technical Ventures',
    date: 'In Planning',
    description:
      'Upcoming experiments focusing on interactive data visualization, agentic AI orchestration, and socio-technical systems engineering.',
    tags: ['Coming Soon'],
    isFuture: true,
    category: 'Other',
  },
];

const selectedWorks: AcademicWork[] = [
  {
    title: 'MSc Thesis — Complex Systems Engineering',
    subtitle: 'TU Delft · CoSEM Master Thesis',
    description:
      'Master thesis completed for the Complex Systems Engineering and Management (CoSEM) program at Delft University of Technology.',
    url: 'https://drive.google.com/file/d/1TS-WS0NOCOxToiFm_OExkutYOhSU5BXa/preview',
    category: 'Thesis',
  },
  {
    title: 'CoSEM Research Challenges Literature Review',
    subtitle: 'TU Delft · Academic Article',
    description:
      'Structured literature review synthesizing contemporary methodologies and challenges in socio-technical systems research.',
    url: 'https://drive.google.com/file/d/17RUkst9oBVvHwhyItcPCP7C1vbV2686v/preview',
    category: 'Report',
  },
  {
    title: 'Digital Platform Design for the SDGs',
    subtitle: 'TU Delft · Individual Design Report',
    description:
      'End-to-end architecture and governance design for an online multi-sided platform tackling Sustainable Development Goals.',
    url: 'https://drive.google.com/file/d/1SspTG_UQJmYK7RJ8xinw6-1IPu5UafAV/preview',
    category: 'Report',
  },
  {
    title: 'Digital Service Architecture (SEN1611)',
    subtitle: 'TU Delft · Group Architecture Report',
    description:
      'Enterprise and service-oriented architecture specification for a modern digital service ecosystem.',
    url: 'https://drive.google.com/file/d/1YrsZNjUp3nV25Hd5BbJFvyT34mu4Dtuj/preview',
    category: 'Report',
  },
  {
    title: 'Sonae Group Logistics Optimization Case',
    subtitle: 'University of Porto · Case Presentation',
    description:
      'Quantitative routing and scheduling solution for truck deliveries serving a major supermarket retail chain.',
    url: 'https://drive.google.com/file/d/13Ees0246A3XRzWQB4ITxztXOm9HQf1UB/preview',
    category: 'Presentation',
  },
  {
    title: 'Digital Startup Valorization Plan',
    subtitle: 'Venture Strategy & Commercialization',
    description:
      'Market research, business model validation, and financial valorization roadmap for a digital startup service.',
    url: 'https://drive.google.com/file/d/1xdDf52ojZyjpj2Fp1MfTSKyBRpKQtv6I/preview',
    category: 'Report',
  },
  {
    title: 'Agent-Based Complex System Simulation',
    subtitle: 'Modeling & Simulation Study',
    description:
      'Emergent behavior analysis of a complex adaptive system built and evaluated through agent-based simulation.',
    url: 'https://drive.google.com/file/d/1rgOrRTYZp2xZjif6RuDwokTAT5Z_BIY5/preview',
    category: 'Simulation',
  },
  {
    title: 'Mars Robot Pathfinding & Locomotion',
    subtitle: 'BSc Integration Graduation Project',
    description:
      'Simulation and algorithmic optimization of autonomous pathfinding and locomotion for a Mars exploration rover.',
    url: 'https://drive.google.com/file/d/14jvXJaS3nJsaLAM_ZazR8ZfN-MIiJJj2/preview',
    category: 'Report',
  },
  {
    title: 'Engineering Product & Materials Selection',
    subtitle: 'Materials Engineering Analysis',
    description:
      'Systematic multi-criteria materials selection and performance trade-off analysis using specialized engineering software.',
    url: 'https://drive.google.com/file/d/1LLzj4RLKg1AHHqUYUGK5ZRML41mCH_CF/preview',
    category: 'Report',
  },
  {
    title: 'Forus Startup Data & Org Advisory',
    subtitle: 'Minor Data Wise · Consulting Report',
    description:
      'Applied consulting engagement advising a startup on organizational structure, data governance, and analytics strategy.',
    url: 'https://drive.google.com/file/d/1Uar2ApiJ4cY_gLUOuVfzhZ7dZTgG7Q-_/preview',
    category: 'Report',
  },
];

const academicCategories = ['All', 'Thesis', 'Report', 'Presentation', 'Simulation'];
const techCategories = ['All', 'Infrastructure', 'AI & Data', 'System Design', 'Other'];

interface ShareButtonsProps {
  title: string;
  shareUrl: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, shareUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  };

  const encodedTitle = encodeURIComponent(`Check out George Gittins' project: ${title}`);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="flex items-center gap-1.5">
      <Button asChild variant="ghost" size="icon-xs" title="Share on LinkedIn">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${title} on LinkedIn`}
        >
          <LinkedInIcon className="size-3.5" />
        </a>
      </Button>
      <Button asChild variant="ghost" size="icon-xs" title="Share on X">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${title} on Twitter`}
        >
          <Share2 className="size-3.5" />
        </a>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy link'}
        aria-label={`Copy link for ${title}`}
      >
        {copied ? <Check className="size-3.5 text-brand" /> : <Copy className="size-3.5" />}
      </Button>
    </div>
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [techFilter, setTechFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [techSearchQuery, setTechSearchQuery] = useState<string>('');
  const [previewWork, setPreviewWork] = useState<AcademicWork | null>(null);

  const filteredTechProjects = useMemo(() => {
    return technicalProjects.filter((project) => {
      const matchesFilter = techFilter === 'All' || project.category === techFilter;
      const q = techSearchQuery.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        (project.company && project.company.toLowerCase().includes(q)) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [techSearchQuery, techFilter]);

  const filteredWorks = useMemo(() => {
    return selectedWorks.filter((work) => {
      const matchesFilter = filter === 'All' || work.category === filter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        work.title.toLowerCase().includes(q) ||
        work.subtitle.toLowerCase().includes(q) ||
        work.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <div className="flex flex-col gap-14">
      {/* Page Title */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-brand uppercase">
          <FolderGit2 className="size-3.5" />
          Portfolio &amp; Community
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Volunteering &amp; Projects
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Production AI platforms, civic technology initiatives, community leadership, and selected academic research.
        </p>
      </div>

      {/* Volunteering Section */}
      <section id="volunteering" className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <HeartHandshake className="size-5 text-brand" />
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Volunteering &amp; Community
          </h2>
        </div>

        <Card className="py-5 transition-all hover:border-brand/50 hover:shadow-md">
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-1.5 shadow-xs">
              <img
                src={globalShapersLogo}
                alt="Global Shapers"
                className="size-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  Global Shapers Community{' '}
                  <span className="font-normal text-muted-foreground">/</span>{' '}
                  <span className="text-brand">Active Member</span>
                </h3>
                <Badge variant="brand">Jan 2025 – Present · The Hague</Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A dynamic World Economic Forum-backed community of young leaders setting ambitious goals for personal growth and local impact. Contributing to initiatives including Circle Hub and Financial Literacy, proposing new civic projects, and organizing community events.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Technical Projects Section */}
      <section id="tech-projects" className="flex flex-col gap-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Technical Projects
            </h2>
            <p className="text-sm text-muted-foreground">
              Agentic AI tools, nonprofit platforms, and cloud infrastructure.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={techSearchQuery}
              onChange={(e) => setTechSearchQuery(e.target.value)}
              className="pr-9 pl-9"
            />
            {techSearchQuery && (
              <button
                type="button"
                onClick={() => setTechSearchQuery('')}
                aria-label="Clear project search"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {techCategories.map((cat) => (
            <Button
              key={cat}
              type="button"
              size="sm"
              variant={techFilter === cat ? 'brand' : 'outline'}
              onClick={() => setTechFilter(cat)}
              aria-label={`Filter by ${cat}`}
              aria-pressed={techFilter === cat}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        {filteredTechProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredTechProjects.map((project, index) => (
              <Card
                key={index}
                className={cn(
                  'flex h-full flex-col justify-between transition-all duration-200 hover:border-brand/50 hover:shadow-md',
                  project.isFuture && 'border-dashed opacity-75'
                )}
              >
                <CardHeader className="gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {project.logo ? (
                        <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white p-1 shadow-xs">
                          <img
                            src={project.logo}
                            alt={project.title}
                            className="size-full object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : (
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-muted text-xs font-bold text-foreground">
                          {project.isFuture ? '?' : 'GG'}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-base">{project.title}</CardTitle>
                        <CardDescription className="text-xs">{project.date}</CardDescription>
                      </div>
                    </div>
                    {!project.isFuture && (
                      <Badge variant="brand">{project.category}</Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {!project.isFuture && (
                  <CardFooter className="justify-between border-t pt-4">
                    {project.link ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          Visit Project
                          <ExternalLink className="size-3.5" />
                        </a>
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">Live on georgegittins.com</span>
                    )}
                    <ShareButtons
                      title={project.title}
                      shareUrl={project.link || 'https://www.georgegittins.com/projects'}
                    />
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed py-10 text-center">
            <CardContent className="flex flex-col items-center gap-3">
              <Search className="size-7 text-muted-foreground/60" />
              <p className="text-sm text-muted-foreground">
                No projects found matching your criteria.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTechFilter('All');
                  setTechSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      <Separator />

      {/* Selected Academic Work Section */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-brand" />
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Selected Academic Work
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Click &ldquo;Preview PDF&rdquo; on any publication to inspect it right here without leaving the page.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search academic work..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-9 pl-9"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear academic work search"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {academicCategories.map((cat) => (
            <Button
              key={cat}
              type="button"
              size="sm"
              variant={filter === cat ? 'brand' : 'outline'}
              onClick={() => setFilter(cat)}
              aria-label={`Filter by ${cat}`}
              aria-pressed={filter === cat}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        {filteredWorks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredWorks.map((work, index) => (
              <Card
                key={index}
                className="flex h-full flex-col justify-between transition-all duration-200 hover:border-brand/50 hover:shadow-md"
              >
                <CardHeader className="gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                        <FileText className="size-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{work.title}</CardTitle>
                        <CardDescription className="text-xs">{work.subtitle}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={work.category === 'Thesis' ? 'brand' : 'secondary'}>
                      {work.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {work.description}
                  </p>
                </CardContent>

                <CardFooter className="justify-between gap-2 border-t pt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      variant="brand"
                      size="sm"
                      onClick={() => setPreviewWork(work)}
                    >
                      <Eye className="size-3.5" />
                      Preview PDF
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={work.url.replace('/preview', '/view')}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${work.title} PDF in a new tab`}
                      >
                        Open
                        <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                  </div>
                  <ShareButtons title={work.title} shareUrl={work.url} />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed py-10 text-center">
            <CardContent className="flex flex-col items-center gap-3">
              <Search className="size-7 text-muted-foreground/60" />
              <p className="text-sm text-muted-foreground">
                No academic work found matching &quot;{searchQuery}&quot;
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilter('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Lazy-Loaded PDF Preview Dialog */}
      <Dialog open={!!previewWork} onOpenChange={(open) => !open && setPreviewWork(null)}>
        <DialogContent className="flex h-[85vh] max-w-4xl flex-col gap-4 sm:max-w-4xl">
          {previewWork && (
            <>
              <DialogHeader className="pr-8">
                <div className="flex items-center gap-2">
                  <Badge variant="brand">{previewWork.category}</Badge>
                  <span className="text-xs text-muted-foreground">{previewWork.subtitle}</span>
                </div>
                <DialogTitle>{previewWork.title}</DialogTitle>
                <DialogDescription>{previewWork.description}</DialogDescription>
              </DialogHeader>
              <div className="min-h-0 flex-1 overflow-hidden rounded-lg border bg-muted">
                <iframe
                  src={previewWork.url}
                  title={previewWork.title}
                  className="size-full border-0"
                  allow="autoplay"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <a
                    href={previewWork.url.replace('/preview', '/view')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Drive
                    <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
