import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/photos/image-1.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Shashank Pandey</title>
        <meta
          name="description"
          content="I’m Shashank Pandey. I’m a software developer based in India."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Shashank Pandey. I’m a software developer based in India.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I’ve been fascinated by building things for as long as I can
                remember. A few years ago, I wrote my first React component—just
                a simple button—but seeing it come to life on the screen was all
                it took to get me hooked.
              </p>
              <p>
                Since then, I’ve spent my time crafting user-facing products,
                solving real-world problems with JavaScript, and delivering
                freelance projects that bring ideas to life. I’ve worked with
                startups, building sleek interfaces with React and Next.js,
                while also diving into backend logic with Node and Express.
                Along the way, I’ve explored SQL and NoSQL databases, always
                looking for ways to make data flow seamlessly.
              </p>
              <p>
                Beyond development, I’ve led a thriving community of 1,000+
                students and professionals, blending my passion for technology
                with community building. As a project management intern at
                Microsoft, I navigated financial planning and risk management,
                gaining a deeper understanding of how products move from concept
                to reality.
              </p>
              <p>
                Today, I’m driven by startups, full-stack development, and
                creating solutions that bridge the gap between technology and
                real-life challenges—one project at a time.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="https://x.com/shashank_iter" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://instagram.com/alchemist_of_dreams"
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/shashank-iter"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://linkedin.com/in/shashank---pandey"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:pandeyshashank812@gmail.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                pandeyshashank812@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
