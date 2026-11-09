import { useEffect, useRef, useState } from "react";
import { MessageCircleHeart, X } from "lucide-react";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea, type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { CLINIC } from "@/lib/clinic";

type Msg = { id: string; role: "user" | "assistant"; content: string };
type Status = "ready" | "submitted" | "streaming" | "error";

const SUGGESTIONS = ["How much does a root canal cost?", "Are you open this evening?", "Braces or clear aligners?"];

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [status, setStatus] = useState<Status>("ready");
  const [text, setText] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && (status === "ready" || status === "error")) taRef.current?.focus();
  }, [open, status]);

  async function send(content: string) {
    const q = content.trim();
    if (!q || status === "submitted" || status === "streaming") return;
    const history = [...messages, { id: crypto.randomUUID(), role: "user" as const, content: q }];
    setMessages(history);
    setText("");
    setStatus("submitted");
    const aid = crypto.randomUUID();
    try {
      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text());
      setMessages((m) => [...m, { id: aid, role: "assistant", content: "" }]);
      setStatus("streaming");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        setMessages((m) => m.map((x) => (x.id === aid ? { ...x, content: x.content + chunk } : x)));
      }
      setStatus("ready");
    } catch {
      setMessages((m) => [
        ...m.filter((x) => x.id !== aid),
        { id: aid, role: "assistant", content: `Sorry, I couldn't answer just now. Please call **${CLINIC.phone}** or message us on WhatsApp.` },
      ]);
      setStatus("error");
    }
  }

  const onSubmit = (msg: PromptInputMessage) => send(msg.text ?? "");

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Ask our dental assistant"}
        className="fixed bottom-24 right-4 z-50 flex min-h-12 items-center gap-2 rounded-full bg-teal-gradient px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft ring-1 ring-gold-dark/30 transition hover:-translate-y-0.5 md:bottom-6 md:right-6"
      >
        {open ? <X className="size-5" /> : <MessageCircleHeart className="size-5 text-gold-dark" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask Smile Desk"}</span>
      </button>
      {open && (
        <div className="fixed inset-x-3 bottom-40 z-50 flex h-[min(70vh,560px)] flex-col overflow-hidden rounded-3xl border bg-card shadow-soft md:inset-x-auto md:bottom-24 md:right-6 md:w-[400px] shadow-card">
          <div className="flex items-center gap-3 bg-teal-gradient px-5 py-4 text-primary-foreground">
            <div className="flex size-10 items-center justify-center rounded-full bg-gold-dark font-display text-lg font-semibold text-teal-deep">A</div>
            <div>
              <p className="font-display text-lg leading-tight">Smile Desk</p>
              <p className="text-xs opacity-80">AI assistant · {CLINIC.name}</p>
            </div>
          </div>
          <Conversation className="flex-1">
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState title="Vanakkam! How can we help?" description="Ask about treatments, indicative prices, timings or directions.">
                  <div className="mt-2 flex flex-col items-center gap-2">
                    <p className="font-display text-xl text-foreground">Vanakkam! How can we help?</p>
                    <p className="text-sm text-muted-foreground">Ask about treatments, indicative prices, timings or directions.</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button key={s} onClick={() => send(s)} className="rounded-full border bg-background px-3 py-1.5 text-xs transition hover:border-primary hover:text-primary">{s}</button>
                      ))}
                    </div>
                  </div>
                </ConversationEmptyState>
              ) : (
                messages.map((m) => (
                  <Message key={m.id} from={m.role}>
                    <MessageContent className={m.role === "user" ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground" : ""}>
                      {m.role === "assistant" ? <MessageResponse>{m.content}</MessageResponse> : m.content}
                    </MessageContent>
                  </Message>
                ))
              )}
              {status === "submitted" && <Shimmer className="text-sm">Checking with the front desk…</Shimmer>}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          <div className="border-t p-3">
            <PromptInput onSubmit={onSubmit}>
              <PromptInputTextarea ref={taRef} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your question…" />
              <PromptInputFooter className="justify-between">
                <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="text-xs font-semibold text-secondary hover:underline">Book on WhatsApp →</a>
                <PromptInputSubmit status={status === "error" ? "ready" : status} disabled={!text.trim() && status === "ready"} />
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">General information only, not a diagnosis.</p>
          </div>
        </div>
      )}
    </>
  );
}
