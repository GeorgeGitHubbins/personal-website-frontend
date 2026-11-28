import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Copy,
  Search,
  Share2,
  X,
} from 'lucide-react';
import { LinkedInIcon } from '@/components/ui/brand-icons';
import { blogPosts } from '../data/blogData';
import { calculateReadingTime } from '../utils/readingTime';
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
import { Separator } from '@/components/ui/separator';

const Blog: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (slug) {
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
      return (
        <Card className="mx-auto max-w-xl py-12 text-center">
          <CardContent className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">Article Not Found</h2>
            <p className="text-sm text-muted-foreground">
              The article you are looking for does not exist or has been moved.
            </p>
            <Button asChild variant="outline">
              <Link to="/blog">
                <ArrowLeft className="size-4" />
                Back to Blog
              </Link>
            </Button>
          </CardContent>
        </Card>
      );
    }

    const relatedPosts = blogPosts
      .filter((p) => p.slug !== post.slug)
      .slice(0, 2);
    const readingTime = calculateReadingTime(post.contentText);

    return (
      <section className="mx-auto flex max-w-3xl flex-col gap-8">
        <div>
          <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
            <Link to="/blog">
              <ArrowLeft className="size-4" />
              Back to all articles
            </Link>
          </Button>
        </div>

        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="brand">{post.category}</Badge>
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {readingTime} min read
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </header>

        <Separator />

        <div className="blog-detail-content-wrapper">{post.content}</div>

        {/* Share Card */}
        <Card className="bg-muted/30 py-5">
          <CardContent className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-base font-semibold text-foreground">Share this article</h3>
              <p className="text-xs text-muted-foreground">
                Found this helpful? Share it with your network.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyLink} aria-label="Copy link to clipboard">
                {copied ? <Check className="size-3.5 text-brand" /> : <Copy className="size-3.5" />}
                {copied ? 'Link Copied' : 'Copy Link'}
              </Button>
              <Button asChild variant="outline" size="sm">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <LinkedInIcon className="size-3.5" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                >
                  <Share2 className="size-3.5" />
                  X / Twitter
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {relatedPosts.length > 0 && (
          <div className="flex flex-col gap-4 pt-4">
            <Separator />
            <h2 className="text-xl font-bold tracking-tight text-foreground">Related Articles</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedPosts.map((related) => {
                const rReadingTime = calculateReadingTime(related.contentText);
                return (
                  <Card
                    key={related.slug}
                    className="cursor-pointer py-5 transition-all hover:border-brand/50 hover:shadow-md"
                    onClick={() => navigate(`/blog/${related.slug}`)}
                  >
                    <CardHeader className="gap-2 pb-2">
                      <Badge variant="secondary" className="w-fit">
                        {related.category}
                      </Badge>
                      <CardTitle className="text-base">{related.title}</CardTitle>
                    </CardHeader>
                    <CardFooter className="justify-between text-xs text-muted-foreground">
                      <span>
                        {new Date(related.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {rReadingTime} min
                      </span>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </section>
    );
  }

  const categories = ['All', 'Web Dev', 'AI & Automation', 'Cloud', 'Systems Eng', 'Startups'];

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return blogPosts.length;
    return blogPosts.filter((p) => p.category === cat).length;
  };

  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        post.contentText.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-brand uppercase">
          <BookOpen className="size-3.5" />
          Writing &amp; Engineering Notes
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Insights &amp; Perspectives
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Deep dives on software engineering, serverless architectures, autonomous systems, and modern AI pipelines.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
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

          <span className="text-xs font-medium text-muted-foreground">
            {filteredPosts.length === 1
              ? 'Showing 1 article'
              : `Showing ${filteredPosts.length} articles`}
          </span>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter blog posts by category">
          {categories.map((cat) => (
            <Button
              key={cat}
              type="button"
              role="tab"
              size="sm"
              aria-selected={selectedCategory === cat}
              variant={selectedCategory === cat ? 'brand' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full"
            >
              {cat} ({getCategoryCount(cat)})
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredPosts.map((post) => {
            const readingTime = calculateReadingTime(post.contentText);
            return (
              <Card
                key={post.slug}
                className="group flex h-full cursor-pointer flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-md"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <CardHeader className="gap-3">
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <Badge variant="brand">{post.category}</Badge>
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <CardTitle className="text-lg transition-colors group-hover:text-brand">
                    <Link
                      to={`/blog/${post.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="focus:outline-none"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </CardContent>

                <CardFooter className="justify-between border-t pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {readingTime} min read
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-brand">
                    Read Article
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed py-12 text-center">
          <CardContent className="flex flex-col items-center gap-3">
            <Search className="size-8 text-muted-foreground/60" />
            <h3 className="text-base font-semibold">No articles found</h3>
            <p className="text-sm text-muted-foreground">
              Try clearing your search query or choosing a different category.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default Blog;
