import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  VscArrowRight,
  VscGithubAlt,
  VscMail,
  VscLocation,
  VscCalendar,
  VscCode,
  VscProject
} from 'react-icons/vsc';

import styles from '@/styles/HomePage.module.css';

const roles = [
  'Full Stack Web Developer',
  'Prompt Engineer',
  'React Specialist',
  'TypeScript Expert'
];

export default function HomePage() {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typingLines, setTypingLines] = useState<{[key: number]: string}>({});
  const [currentlyTyping, setCurrentlyTyping] = useState<number | null>(null);
  const codeEditorRef = useRef<HTMLDivElement>(null);

  // Complex, senior-level code demonstration
  const codeLines = [
    { code: '// Enterprise-grade TypeScript with advanced patterns', type: 'comment' },
    { code: 'interface DeveloperProfile {', type: 'interface' },
    { code: '  readonly id: string;', type: 'property' },
    { code: '  name: string;', type: 'property' },
    { code: '  role: string;', type: 'property' },
    { code: '  expertise: readonly string[];', type: 'property' },
    { code: '  experience: {', type: 'nested-object' },
    { code: '    years: number;', type: 'property' },
    { code: '    technologies: Map<string, number>;', type: 'property' },
    { code: '  };', type: 'close' },
    { code: '}', type: 'close' },
    { code: '', type: 'blank' },
    { code: '// Generic type with constraints and utility types', type: 'comment' },
    { code: 'type AsyncOperation<T> = Promise<T>;', type: 'type-definition' },
    { code: 'type ValidationResult<T> = {', type: 'type-definition' },
    { code: '  isValid: boolean;', type: 'property' },
    { code: '  errors: string[];', type: 'property' },
    { code: '  data?: T;', type: 'property' },
    { code: '};', type: 'close' },
    { code: '', type: 'blank' },
    { code: '// Advanced React patterns with custom hooks', type: 'comment' },
    { code: 'const useDeveloperProfile = (): DeveloperProfile => {', type: 'function' },
    { code: '  const [profile, setProfile] = useState<DeveloperProfile>({', type: 'variable' },
    { code: '    id: crypto.randomUUID(),', type: 'property' },
    { code: "    name: 'Hung Vo',", type: 'property' },
    { code: "    role: 'Senior Full Stack Developer & Prompt Engineer',", type: 'property' },
    { code: '    expertise: {', type: 'object-start' },
    { code: '      frontend: [', type: 'array-start' },
    { code: "        'React', 'TypeScript', 'Next.js', 'HTML/CSS'", type: 'array-item' },
    { code: '      ],', type: 'array-end' },
    { code: '      backend: [', type: 'array-start' },
    { code: "        'Node.js', 'Python', 'Django', 'Flask', 'FastAPI'", type: 'array-item' },
    { code: '      ],', type: 'array-end' },
    { code: '      databases: [', type: 'array-start' },
    { code: "        'PostgreSQL', 'MongoDB', 'GraphQL'", type: 'array-item' },
    { code: '      ],', type: 'array-end' },
    { code: '      devops: [', type: 'array-start' },
    { code: "        'Docker', 'AWS', 'CI/CD', 'Git'", type: 'array-item' },
    { code: '      ],', type: 'array-end' },
    { code: '      aiTools: [', type: 'array-start' },
    { code: "        'Lovable', 'Replit', 'Base44', 'Bolt.new',", type: 'array-item' },
    { code: "        'V0', 'Famous AI', 'Prompt Engineering'", type: 'array-item' },
    { code: '      ]', type: 'array-end' },
    { code: '    },', type: 'close' },
    { code: '    experience: {', type: 'nested-object' },
    { code: '      totalYears: 5,', type: 'property' },
    { code: '      roles: [', type: 'array-start' },
    { code: "        { title: 'Senior Full Stack Developer', years: 2 },", type: 'array-item' },
    { code: "        { title: 'Full Stack Developer', years: 2 },", type: 'array-item' },
    { code: "        { title: 'Frontend Developer', years: 1 }", type: 'array-item' },
    { code: '      ],', type: 'array-end' },
    { code: '      technologies: new Map([', type: 'property' },
    { code: "        ['React', 4], ['TypeScript', 3], ['Node.js', 4],", type: 'array-item' },
    { code: "        ['Python', 3], ['Django', 2], ['PostgreSQL', 3],", type: 'array-item' },
    { code: "        ['Docker', 2], ['AWS', 2], ['GraphQL', 2]", type: 'array-item' },
    { code: '      ]),', type: 'array-end' },
    { code: '      projects: {', type: 'nested-object' },
    { code: '        completed: 80,', type: 'property' },
    { code: '        clients: 50,', type: 'property' },
    { code: '        teamSize: "1-10 developers"', type: 'property' },
    { code: '      }', type: 'close' },
    { code: '    },', type: 'close' },
    { code: '    contact: {', type: 'nested-object' },
    { code: "      address: '35/139 Nguyen Ngoc Vu, Trung Hoa',", type: 'property' },
    { code: "      city: 'Hanoi, HN 100000',", type: 'property' },
    { code: "      country: 'Vietnam'", type: 'property' },
    { code: '    }', type: 'close' },
    { code: '  });', type: 'close' },
    { code: '', type: 'blank' },
    { code: '  return profile;', type: 'return' },
    { code: '};', type: 'close-function' },
    { code: '', type: 'blank' },
    { code: '// Custom hook with memoization and error boundaries', type: 'comment' },
    { code: 'const useCodeExecution = <T>(', type: 'function' },
    { code: '  operation: AsyncOperation<T>,', type: 'parameter' },
    { code: '  dependencies: readonly unknown[]', type: 'parameter' },
    { code: ') => {', type: 'function-start' },
    { code: '  const [state, setState] = useState<{', type: 'variable' },
    { code: '    data: T | null;', type: 'property' },
    { code: '    loading: boolean;', type: 'property' },
    { code: '    error: Error | null;', type: 'property' },
    { code: '  }>({', type: 'object-start' },
    { code: '    data: null,', type: 'property' },
    { code: '    loading: false,', type: 'property' },
    { code: '    error: null', type: 'property' },
    { code: '  });', type: 'close' },
    { code: '', type: 'blank' },
    { code: '  const execute = useCallback(async () => {', type: 'function' },
    { code: '    setState(prev => ({ ...prev, loading: true }));', type: 'function-call' },
    { code: '    try {', type: 'try' },
    { code: '      const result = await operation;', type: 'variable' },
    { code: '      setState({ data: result, loading: false, error: null });', type: 'function-call' },
    { code: '    } catch (error) {', type: 'catch' },
    { code: '      setState({', type: 'function-call' },
    { code: '        data: null,', type: 'property' },
    { code: '        loading: false,', type: 'property' },
    { code: '        error: error instanceof Error ? error : new Error(String(error))', type: 'property' },
    { code: '      });', type: 'close' },
    { code: '    }', type: 'close' },
    { code: '  }, [operation]);', type: 'close' },
    { code: '', type: 'blank' },
    { code: '  return { ...state, execute };', type: 'return' },
    { code: '};', type: 'close-function' },
    { code: '', type: 'blank' },
    { code: '// Main component with advanced patterns', type: 'comment' },
    { code: 'const HomePage: React.FC = () => {', type: 'function' },
    { code: '  const profile = useDeveloperProfile();', type: 'variable' },
    { code: '  const [activeLine, setActiveLine] = useState(0);', type: 'variable' },
    { code: '  const editorRef = useRef<HTMLDivElement>(null);', type: 'variable' },
    { code: '', type: 'blank' },
    { code: '  // Memoized computed values', type: 'comment' },
    { code: '  const expertiseDisplay = useMemo(() =>', type: 'variable' },
    { code: '    profile.expertise.join(", "),', type: 'function-call' },
    { code: '    [profile.expertise]', type: 'dependency' },
    { code: '  );', type: 'close' },
    { code: '', type: 'blank' },
    { code: '  // Effect with cleanup and error handling', type: 'comment' },
    { code: '  useEffect(() => {', type: 'nested-function' },
    { code: '    const interval = setInterval(() => {', type: 'variable' },
    { code: '      setActiveLine(prev => (prev + 1) % codeLines.length);', type: 'function-call' },
    { code: '    }, 2000);', type: 'close' },
    { code: '', type: 'blank' },
    { code: '    return () => {', type: 'cleanup' },
    { code: '      clearInterval(interval);', type: 'function-call' },
    { code: '    };', type: 'close' },
    { code: '  }, [codeLines.length]);', type: 'close' },
    { code: '', type: 'blank' },
    { code: '  return (', type: 'return-object' },
    { code: '    <main className="hero-container">', type: 'object-method' },
    { code: '      <h1>{profile.name}</h1>', type: 'object-method' },
    { code: '      <p>{profile.role}</p>', type: 'object-method' },
    { code: '      <p>Expertise: {expertiseDisplay}</p>', type: 'object-method' },
    { code: '      <div className="cta">', type: 'object-method' },
    { code: '        <Link href="/projects">View Projects</Link>', type: 'object-method' },
    { code: '      </div>', type: 'object-method' },
    { code: '    </main>', type: 'object-method' },
    { code: '  );', type: 'close' },
    { code: '};', type: 'close-function' },
    { code: '', type: 'blank' },
    { code: 'export default HomePage;', type: 'function-call' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLineIndex((prev) => (prev + 1) % codeLines.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [codeLines.length]);

  // Auto-scroll to follow the highlighted line
  useEffect(() => {
    if (codeEditorRef.current) {
      const lineHeight = 19.5; // CSS line-height: 1.5 * font-size: 13px = 19.5px
      const containerHeight = codeEditorRef.current.clientHeight;
      const scrollTop = codeEditorRef.current.scrollTop;
      const targetScrollTop = activeLineIndex * lineHeight;

      // Calculate if the active line is visible
      const lineTopPosition = targetScrollTop;
      const lineBottomPosition = targetScrollTop + lineHeight;
      const visibleTop = scrollTop;
      const visibleBottom = scrollTop + containerHeight;

      // Scroll if the line is not fully visible with some padding
      const padding = lineHeight * 2; // Keep 2 lines of padding
      if (lineTopPosition < visibleTop + padding || lineBottomPosition > visibleBottom - padding) {
        // Center the line in the viewport
        const centeredScrollTop = targetScrollTop - (containerHeight / 2) + (lineHeight / 2);

        codeEditorRef.current.scrollTo({
          top: Math.max(0, centeredScrollTop),
          behavior: 'smooth'
        });
      }
    }
  }, [activeLineIndex]);

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= currentRole.length) {
        setTypedText(currentRole.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          // Start erasing
          const eraseInterval = setInterval(() => {
            if (currentIndex > 0) {
              setTypedText(currentRole.slice(0, currentIndex - 1));
              currentIndex--;
            } else {
              clearInterval(eraseInterval);
              setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            }
          }, 50);
        }, 2000); // Wait 2 seconds before erasing
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentRoleIndex]);

  // Random code line typing animation effect
  useEffect(() => {
    const startRandomTyping = () => {
      if (currentlyTyping !== null) return; // Don't start if already typing

      // Select a random line to type
      const randomLineIndex = Math.floor(Math.random() * codeLines.length);
      const targetLine = codeLines[randomLineIndex];

      setCurrentlyTyping(randomLineIndex);
      setTypingLines(prev => ({ ...prev, [randomLineIndex]: '' }));

      let currentIndex = 0;
      const typeCharacter = () => {
        if (currentIndex < targetLine.code.length) {
          setTypingLines(prev => ({
            ...prev,
            [randomLineIndex]: targetLine.code.substring(0, currentIndex + 1)
          }));
          currentIndex++;

          // Random typing speed between 30-100ms per character
          const delay = Math.random() * 70 + 30;
          setTimeout(typeCharacter, delay);
        } else {
          // Typing complete, wait before clearing
          setTimeout(() => {
            setTypingLines(prev => {
              const newState = { ...prev };
              delete newState[randomLineIndex];
              return newState;
            });
            setCurrentlyTyping(null);
          }, 2000 + Math.random() * 3000); // Wait 2-5 seconds before clearing
        }
      };

      typeCharacter();
    };

    // Start typing animation after initial delay
    const initialDelay = setTimeout(() => {
      startRandomTyping();

      // Set up recurring random typing
      const interval = setInterval(() => {
        startRandomTyping();
      }, 4000 + Math.random() * 6000); // Every 4-10 seconds

      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(initialDelay);
  }, [currentlyTyping, codeLines]);

  return (
    <div className={styles.heroLayout}>
      <div className={styles.container}>
        <div className={styles.codeSection}>
          <div className={styles.codeContainer}>
            <div className={styles.editorContent}>
              <div className={styles.lineNumbers}>
                {codeLines.map((_, index) => (
                  <div
                    key={index}
                    className={`${styles.lineNumber} ${index === activeLineIndex ? styles.activeLine : ''
                      }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              <div className={styles.codeEditor} ref={codeEditorRef}>
                {codeLines.map((line, index) => (
                  <div
                    key={index}
                    className={`${styles.codeLine} ${styles[line.type]} ${index === activeLineIndex ? styles.highlightedLine : ''
                      } ${typingLines[index] !== undefined ? styles.typingLine : ''}`}
                  >
                    {typingLines[index] !== undefined ? (
                      <>
                        {typingLines[index]}
                        {currentlyTyping === index && <span className={styles.cursor}>|</span>}
                      </>
                    ) : (
                      line.code
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.overlayGlow}></div>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.developerName}>
            <span className={styles.accentText}>Hung Vo</span>
          </h1>

          <div className={styles.developerRole}>
            {typedText}
            <span className={styles.cursor}>|</span>
          </div>

          <p className={styles.bio}>
            I design and build <span className={styles.highlight}>elegant, responsive web applications</span> that combine <span className={styles.highlight}>modern technologies</span> with seamless user experiences. With a focus on <span className={styles.highlight}>clean, scalable code</span> and intuitive design, I deliver <span className={styles.highlight}>high-performance products</span> that users love. I’ve also built and launched <span className={styles.highlight}>SaaS MVPs</span> using <span className={styles.highlight}>AI-powered tools</span>—accelerating development, reducing costs, and helping startups validate ideas faster. Additionally, I create advanced <span className={styles.highlight}>prompt engineering tools</span> that drive workflow automation and innovation for both businesses and individuals.
          </p>

          {/* Quick Stats */}
          <div className={styles.statsContainer}>
              <div className={styles.stat}>
                <VscCalendar className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
            </div>
            <div className={styles.stat}>
              <VscProject className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statNumber}>80+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
            </div>
            <div className={styles.stat}>
              <VscCode className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Happy Clients</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className={styles.locationInfo}>
            <VscLocation className={styles.locationIcon} />
            <span>Hanoi, Vietnam</span>
          </div>

          <div className={styles.actionLinks}>
            <Link href="/projects" className={styles.primaryLink}>
              View Projects <VscArrowRight />
            </Link>
            <Link href="/contact" className={styles.secondaryLink}>
              <VscMail /> Contact Me
            </Link>
            <a
              href="https://github.com/vodaihung"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              <VscGithubAlt /> GitHub
            </a>
          </div>
        </div>
      </div>

      <div className={styles.decorElements}>
        <div className={styles.codeFlare}></div>
        <div className={styles.gridLines}></div>
        <div className={styles.codeBlock1}>{'{'}</div>
        <div className={styles.codeBlock2}>{'}'}</div>
        <div className={styles.codeBlock3}>{'<>'}</div>
        <div className={styles.codeBlock4}>{'/>'}</div>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
        <div className={styles.codeSymbol1}>{'()'}</div>
        <div className={styles.codeSymbol2}>{'[]'}</div>
        <div className={styles.codeSymbol3}>{'=>'}</div>
        <div className={styles.dotPattern}></div>
        <div className={styles.mobileAccent}></div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: { title: 'Home' },
  };
}
