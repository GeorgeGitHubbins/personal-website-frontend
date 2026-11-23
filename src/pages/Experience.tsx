import React, { useState, useMemo } from 'react';
import { Briefcase, Calendar, MapPin, Search, X } from 'lucide-react';
import InteractiveTimeline from '../components/InteractiveTimeline';
import { experienceData } from '../data/experienceData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  'All',
  'Engineering & Tech',
  'Data & Analytics',
  'Leadership & Strategy',
  'Operations & Logistics',
];

const Experience: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredExperience = useMemo(() => {
    return experienceData.filter((item) => {
      const matchesFilter = filter === 'All' || item.categories.includes(filter);
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.company.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.label.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <section id="experience" className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-brand uppercase">
          <Briefcase className="size-3.5" />
          Career Trajectory
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Work Experience
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          From consulting on energy and AI systems at Sia Partners to founding an AI startup and scaling logistics operations.
        </p>
      </div>

      <InteractiveTimeline />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Detailed History
            </h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredExperience.length} of {experienceData.length} roles
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-9 pl-9"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
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

        {/* Experience Cards */}
        {filteredExperience.length > 0 ? (
          <div className="relative flex flex-col gap-4 md:pl-6 md:before:absolute md:before:top-4 md:before:bottom-4 md:before:left-1.5 md:before:w-px md:before:bg-border">
            {filteredExperience.map((item, index) => (
              <Card
                key={`${item.company}-${item.role}-${index}`}
                className="experience-card relative py-5 transition-all duration-200 hover:border-brand/50 hover:shadow-md md:before:absolute md:before:top-7 md:before:-left-[23px] md:before:size-2.5 md:before:rounded-full md:before:border-2 md:before:border-background md:before:bg-brand"
              >
                <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                  <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-1.5 shadow-xs">
                    <img
                      src={item.logo}
                      alt={item.company}
                      className="size-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2.5">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {item.company}{' '}
                        <span className="font-normal text-muted-foreground">/</span>{' '}
                        <span className="text-brand">{item.role}</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-3.5" />
                          {item.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm leading-relaxed text-muted-foreground [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-5">
                      {item.description}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed py-12 text-center">
            <CardContent className="flex flex-col items-center gap-3">
              <Search className="size-8 text-muted-foreground/60" />
              <p className="text-sm text-muted-foreground">
                No experience found matching your criteria.
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
      </div>
    </section>
  );
};

export default Experience;
