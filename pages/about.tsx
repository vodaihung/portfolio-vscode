import styles from '@/styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hung Vo</h1>
        <div className={styles.subtitle}>
          Software Engineer | Prompt Engineer | Full Stack Developer
        </div>

        <div className={styles.aboutContent}>
          <section className={styles.section}>
            <p className={styles.paragraph}>
              Hi! I&apos;m a software engineer from Vietnam with a strong background in full-stack web development.
              I specialize in <span className={styles.highlight}>JavaScript</span> and{' '}
              <span className={styles.highlight}>TypeScript</span>, with deep expertise in the{' '}
              <span className={styles.highlight}>React ecosystem</span>—including frameworks like{' '}
              <span className={styles.highlight}>Next.js</span> for server-side rendering and scalable frontend architecture.
            </p>
            <p className={styles.paragraph}>
              On the backend, I work extensively with <span className={styles.highlight}>Node.js</span> and modern
              databases like <span className={styles.highlight}>PostgreSQL</span> and{' '}
              <span className={styles.highlight}>Supabase</span>, building secure, efficient APIs and real-time systems.
              I&apos;m passionate about creating clean, maintainable codebases and user-friendly interfaces that
              perform seamlessly across devices.
            </p>
            <p className={styles.paragraph}>
              Beyond traditional development, I also integrate <span className={styles.highlight}>AI technologies</span> into
              my work—leveraging tools like <span className={styles.highlight}>OpenAI</span>,{' '}
              <span className={styles.highlight}>LangChain</span>, and no-code/low-code platforms to build intelligent,
              automated solutions. I&apos;ve developed multiple <span className={styles.highlight}>SaaS MVPs</span> using
              AI-powered workflows, helping startups rapidly validate ideas and optimize operations.
            </p>
            <p className={styles.paragraph}>
              My approach is both creative and pragmatic: I focus on building elegant, functional products that solve
              real problems, scale effectively, and deliver lasting value to users and businesses alike.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>

            <div className={styles.experienceItem}>
              <h3 className={styles.jobTitle}>Fullstack Engineer</h3>
              <div className={styles.company}>LTS Group • April 2024 - June 2025</div>
              <p className={styles.paragraph}>
                At LTS Group, I work as a Fullstack Developer specializing in both web and AI development.
                I build modern web applications using <span className={styles.highlight}>React.js</span> and{' '}
                <span className={styles.highlight}>Next.js</span> on the frontend, while developing backend
                services and AI-powered features using <span className={styles.highlight}>Python</span>.
                I contribute to projects that integrate machine learning models and intelligent automation,
                delivering scalable and smart solutions for clients.
              </p>
            </div>

            <div className={styles.experienceItem}>
              <h3 className={styles.jobTitle}>Software Engineer</h3>
              <div className={styles.company}>NSC Software • September 2023 - February 2024</div>
              <p className={styles.paragraph}>
                As a Fullstack Development Intern, I contributed to projects using modern technologies including{' '}
                <span className={styles.highlight}>React.js</span>, <span className={styles.highlight}>Next.js</span>,{' '}
                <span className={styles.highlight}>Node.js</span>, and various AI tools. I gained hands-on experience
                with fullstack architecture and AI integration while collaborating with the development team on
                building scalable web applications.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Specialized Skills</h2>

            <div className={styles.skillItem}>
              <h3 className={styles.skillTitle}>Jamstack Development</h3>
              <p className={styles.paragraph}>
                I build SEO-optimized, CMS-powered sites using the Jamstack approach with{' '}
                <span className={styles.highlight}>Next.js</span> and headless CMS solutions.
                I work with <span className={styles.highlight}>Sanity.io</span> for structured content editing
                and <span className={styles.highlight}>Prismic/Contentful</span> for marketing sites,
                integrating real-time preview and webhook-triggered builds.
              </p>
            </div>

            <div className={styles.skillItem}>
              <h3 className={styles.skillTitle}>LLM Integration & Prompt Engineering</h3>
              <p className={styles.paragraph}>
                I integrate large language models into real-world applications to enable conversational AI,
                smart assistants, and auto-suggestions. I engineer and optimize prompts for different use cases
                using <span className={styles.highlight}>OpenAI&apos;s APIs</span> and tools like{' '}
                <span className={styles.highlight}>V0.dev</span> and <span className={styles.highlight}>Cursor</span>
                for rapid development.
              </p>
            </div>

            <div className={styles.skillItem}>
              <h3 className={styles.skillTitle}>Bug Fixing & Performance Optimization</h3>
              <p className={styles.paragraph}>
                I specialize in identifying and fixing critical bugs in web applications built with{' '}
                <span className={styles.highlight}>React</span>, <span className={styles.highlight}>Next.js</span>,{' '}
                <span className={styles.highlight}>NestJS</span>, and <span className={styles.highlight}>MongoDB</span>.
                I resolve issues related to API integration, state management, and performance bottlenecks.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Beyond Code</h2>
            <p className={styles.paragraph}>
              When I&apos;m not coding, I enjoy exploring new technologies and staying up-to-date
              with the latest developments in AI and web development. I&apos;m passionate about
              continuous learning and contributing to the developer community through knowledge
              sharing and open-source projects.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
