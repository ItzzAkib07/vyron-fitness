import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import SEO from "../components/common/SEO";
import MagneticButton from "../components/common/MagneticButton";
import { blogPosts } from "../data/blogData";

export default function BlogDetail({ onOpenTrial }) {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id || p.slug === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title={`${post.title} — VYRON Research`}
        description={post.excerpt}
        canonical={`https://vyronfitness.com/blog/${post.id}`}
        image={post.image}
        type="article"
      />

      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase text-zinc-400 hover:text-[#E2FF00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Performance Journal</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-[#E2FF00] text-black text-xs font-mono-tech uppercase font-black">
              {post.category}
            </span>
            <span className="text-xs font-mono-tech text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Strip */}
          <div className="flex items-center justify-between gap-4 py-4 border-y border-zinc-800">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <div className="font-bold text-sm text-white">{post.author}</div>
                <div className="text-xs text-zinc-400 font-mono-tech">{post.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                aria-label="Share article"
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#E2FF00] text-xs font-mono-tech text-zinc-300 hover:text-[#E2FF00] transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SHARE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] border border-zinc-800 shadow-2xl mb-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div
          className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4 mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-zinc-800 mb-16">
          <Tag className="w-4 h-4 text-zinc-500 mr-2" />
          {post.tags?.map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono-tech text-zinc-400">
              #{tag}
            </span>
          ))}
        </div>

        {/* Trial CTA Box */}
        <div className="p-8 rounded-3xl bg-zinc-950 border border-[#E2FF00]/40 shadow-2xl text-center mb-16">
          <span className="text-xs font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-1">
            PUT SCIENCE INTO PRACTICE
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-2">
            EXPERIENCE THE VYRON PROTOCOL
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
            Apply these exact periodization methods on our competition barbell platforms with Master Coach oversight.
          </p>
          <MagneticButton onClick={onOpenTrial} variant="primary" size="md">
            <Sparkles className="w-4 h-4 mr-1" />
            Claim 7-Day Free Pass
          </MagneticButton>
        </div>

        {/* Related Posts */}
        <div>
          <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight mb-6">
            RELATED RESEARCH ARTICLES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                to={`/blog/${rel.id}`}
                className="group block p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#00F0FF]/40 transition-all"
              >
                <div className="text-xs font-mono-tech text-[#00F0FF] uppercase mb-1">{rel.category}</div>
                <h4 className="font-display font-bold text-lg text-white uppercase group-hover:text-[#00F0FF] transition-colors mb-2">
                  {rel.title}
                </h4>
                <div className="text-xs text-zinc-500 font-mono-tech">{rel.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
