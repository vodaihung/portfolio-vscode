import { useState, useRef, useEffect } from 'react';
import { VscRocket, VscSend, VscChevronDown, VscComment, VscEdit, VscCheck, VscFiles, VscAdd, VscHistory, VscEllipsis, VscClose } from 'react-icons/vsc';

import styles from '@/styles/ChatSidebar.module.css';
// Lightweight fallback Markdown renderer (no external deps) for headings, lists and code blocks
function SimpleMarkdown({ content }: { content: string }) {
  // Very small subset: fenced code, headings, unordered lists, paragraphs
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Fenced code
    const fenceMatch = line.match(/^```(.*)$/);
    if (fenceMatch) {
      // const codeLang = fenceMatch[1]?.trim() || '';
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        code.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={`code-${i}`}><code>{code.join('\n')}</code></pre>
      );
      i++; // skip closing fence
      continue;
    }
    // Heading
    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length as 1 | 2 | 3;
      const text = heading[2];
      if (level === 1) elements.push(<h1 key={`h-${i}`}>{text}</h1>);
      if (level === 2) elements.push(<h2 key={`h-${i}`}>{text}</h2>);
      if (level === 3) elements.push(<h3 key={`h-${i}`}>{text}</h3>);
      i++;
      continue;
    }
    // Unordered list
    if (line.trim().startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`}>{items.map((t, idx) => <li key={idx}>{t}</li>)}</ul>
      );
      continue;
    }
    // Paragraph
    if (line.trim().length > 0) {
      const paras: string[] = [line];
      i++;
      while (i < lines.length && lines[i].trim().length > 0) {
        paras.push(lines[i]);
        i++;
      }
      elements.push(<p key={`p-${i}`}>{paras.join(' ')}</p>);
      continue;
    }
    i++;
  }
  return <div>{elements}</div>;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const ChatSidebar = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm your coding assistant. Ask about any file, component, or idea.",
    },
  ]);
  const [draft, setDraft] = useState<string>('');
  const [model, setModel] = useState<string>('gpt-5');
  const [mode, setMode] = useState<'agent' | 'ask'>('agent');
  const [isModeMenuOpen, setIsModeMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setDraft('');
    void sendToBackend([...messages, userMessage]);
  };

  const handleClear = () => {
    setMessages([]);
  };

  async function sendToBackend(chat: ChatMessage[]) {
    try {
      const payload = {
        model,
        messages: chat.map((m) => ({ role: m.role, content: m.content })),
      };

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data?.error || `Request failed (${resp.status})`);
      }

      const assistantMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: data.content || '',
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    } catch (err) {
      const messageText = err instanceof Error ? err.message : 'Unknown error';
      const errorMessage: ChatMessage = {
        id: `${Date.now()}-error`,
        role: 'assistant',
        content: `Error: ${messageText}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  }

  return (
    <aside className={styles.chatSidebar}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <VscRocket className={styles.brandIcon} />
          <span>New Chat</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.headerIconBtn} aria-label="New chat" onClick={handleClear}>
            <VscAdd size={16} />
          </button>
          <button className={styles.headerIconBtn} aria-label="History" onClick={() => console.log('open history')}>
            <VscHistory size={16} />
          </button>
          <button className={styles.headerIconBtn} aria-label="More options" onClick={() => console.log('more options')}>
            <VscEllipsis size={16} />
          </button>
          <button className={styles.headerIconBtn} aria-label="Close" onClick={() => console.log('close sidebar')}>
            <VscClose size={16} />
          </button>
        </div>
      </div>

      <div className={styles.messages} ref={scrollRef}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Start a conversation about this portfolio or its code.</p>
            <p className={styles.tip}>Tip: Ask &quot;Open the projects component&quot;</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${
                  msg.role === 'assistant' ? styles.assistant : styles.user
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className={styles.markdown}>
                    <SimpleMarkdown content={msg.content} />
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.loadingDots} aria-label="Assistant is typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Cursor-like composer */}
      <div className={styles.composer}>
        <div className={styles.chipsRow}>
          <span className={styles.chip}>@</span>
          <span className={styles.chip}>1 Tab</span>
        </div>
        <div className={styles.composerBox}>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask, learn, brainstorm"
            className={styles.textarea}
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
        </div>
        <div className={styles.composerFooter}>
          {/* Mode dropdown chip */}
          <div className={styles.modeWrapper}>
            <button
              className={styles.chipButton}
              onClick={() => setIsModeMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={isModeMenuOpen}
            >
              <span className={styles.modeIcon}>{mode === 'agent' ? '∞' : ''}</span>
              <span className={styles.modeLabel}>{mode === 'agent' ? 'Agent' : 'Ask'}</span>
              <span className={styles.modeShortcut}>{mode === 'agent' ? '⌘I' : '⌘L'}</span>
              <VscChevronDown size={14} className={styles.caret} />
            </button>
            {isModeMenuOpen && (
              <div className={styles.modeMenu} role="menu">
                <button
                  className={styles.modeMenuItem}
                  onClick={() => {
                    setMode('agent');
                    setIsModeMenuOpen(false);
                  }}
                  role="menuitem"
                >
                  <span className={styles.menuIcon}><VscEdit size={14} /></span>
                  <span className={styles.menuText}>Agent</span>
                  {mode === 'agent' && <VscCheck size={14} className={styles.menuCheck} />}
                  <span className={styles.menuShortcut}>⌘I</span>
                </button>
                <button
                  className={styles.modeMenuItem}
                  onClick={() => {
                    setMode('ask');
                    setIsModeMenuOpen(false);
                  }}
                  role="menuitem"
                >
                  <span className={styles.menuIcon}><VscComment size={14} /></span>
                  <span className={styles.menuText}>Ask</span>
                  {mode === 'ask' && <VscCheck size={14} className={styles.menuCheck} />}
                  <span className={styles.menuShortcut}>⌘L</span>
                </button>
              </div>
            )}
          </div>

          {/* Model selection chip */}
          <div className={styles.modelChip}>
            <span>{model}</span>
            <VscChevronDown size={14} />
            <select
              className={styles.modelNativeSelect}
              value={model}
              onChange={(e) => setModel(e.target.value)}
              aria-label="Model selector"
            >
              <option value="gpt-5">gpt-5</option>
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="o3-mini">o3-mini</option>
            </select>
          </div>

          <div className={styles.footerRight}>
            <button className={styles.iconButton} aria-label="Insert file">
              <VscFiles size={16} />
            </button>
            <button
              className={styles.sendIconButton}
              onClick={handleSend}
              aria-label="Send message"
            >
              <VscSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;


