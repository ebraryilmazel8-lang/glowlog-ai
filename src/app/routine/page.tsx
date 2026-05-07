"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  CalendarCheck,
  Plus,
  Check,
  Sun,
  Moon,
  Trash2,
  Smile,
  Meh,
  Frown,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import type { RoutineEntry, RoutineStep } from "@/types";

const DEFAULT_MORNING_STEPS = [
  "Temizleyici",
  "Tonik",
  "Serum",
  "Nemlendirici",
  "Gunes Kremi",
];
const DEFAULT_EVENING_STEPS = [
  "Makyaj Temizleyici",
  "Temizleyici",
  "Tonik",
  "Serum",
  "Gece Kremi",
];

export default function RoutinePage() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<RoutineEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"morning" | "evening">("morning");
  const [todayEntry, setTodayEntry] = useState<RoutineEntry | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = localStorage.getItem("glowlog-routines");
    if (saved) {
      const parsed: RoutineEntry[] = JSON.parse(saved);
      setEntries(parsed);
      const todayEntries = parsed.find(
        (e) => e.date === today && e.timeOfDay === activeTab
      );
      setTodayEntry(todayEntries || null);
    }
  }, [activeTab]);

  const saveEntries = (newEntries: RoutineEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem("glowlog-routines", JSON.stringify(newEntries));
  };

  const startRoutine = () => {
    const steps: RoutineStep[] = (
      activeTab === "morning" ? DEFAULT_MORNING_STEPS : DEFAULT_EVENING_STEPS
    ).map((name, i) => ({
      id: `${Date.now()}-${i}`,
      name,
      completed: false,
      order: i,
    }));

    const entry: RoutineEntry = {
      id: `${Date.now()}`,
      date: today,
      timeOfDay: activeTab,
      steps,
      notes: "",
      skinFeeling: 3,
    };

    const newEntries = [...entries.filter((e) => !(e.date === today && e.timeOfDay === activeTab)), entry];
    saveEntries(newEntries);
    setTodayEntry(entry);
  };

  const toggleStep = (stepId: string) => {
    if (!todayEntry) return;
    const updated = {
      ...todayEntry,
      steps: todayEntry.steps.map((s) =>
        s.id === stepId ? { ...s, completed: !s.completed } : s
      ),
    };
    setTodayEntry(updated);
    saveEntries(
      entries.map((e) => (e.id === todayEntry.id ? updated : e))
    );
  };

  const updateNotes = (notes: string) => {
    if (!todayEntry) return;
    const updated = { ...todayEntry, notes };
    setTodayEntry(updated);
    saveEntries(entries.map((e) => (e.id === todayEntry.id ? updated : e)));
  };

  const updateFeeling = (feeling: number) => {
    if (!todayEntry) return;
    const updated = { ...todayEntry, skinFeeling: feeling };
    setTodayEntry(updated);
    saveEntries(entries.map((e) => (e.id === todayEntry.id ? updated : e)));
  };

  const deleteEntry = (id: string) => {
    const newEntries = entries.filter((e) => e.id !== id);
    saveEntries(newEntries);
    if (todayEntry?.id === id) setTodayEntry(null);
  };

  const completedCount = todayEntry?.steps.filter((s) => s.completed).length ?? 0;
  const totalCount = todayEntry?.steps.length ?? 0;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const pastEntries = entries
    .filter((e) => e.date !== today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 14);

  if (!session) {
    return (
      <div className="pt-24 pb-16 px-4 min-h-screen flex items-center justify-center">
        <div className="text-center glass-strong rounded-3xl p-10 max-w-md">
          <CalendarCheck className="w-12 h-12 text-sage-400 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">Giris Yap</h2>
          <p className="text-gray-500 mb-6">Rutinini takip etmek icin once giris yap.</p>
          <button
            onClick={() => signIn()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-glow-400 to-blush-400 text-white font-medium hover:shadow-lg transition-all"
          >
            Giris Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <CalendarCheck className="w-4 h-4 text-sage-400" />
            <span className="text-sm text-gray-600">Gunluk takip</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-3">
            Rutin Takibi
          </h1>
          <p className="text-gray-500">
            Sabah ve aksam bakim rutinini logla, ilerlemeni takip et.
          </p>
        </div>

        {/* Time of day tabs */}
        <div className="flex gap-2 mb-6 p-1 glass-strong rounded-2xl">
          <button
            onClick={() => setActiveTab("morning")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "morning"
                ? "bg-white shadow-sm text-glow-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Sun className="w-4 h-4" /> Sabah
          </button>
          <button
            onClick={() => setActiveTab("evening")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "evening"
                ? "bg-white shadow-sm text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Moon className="w-4 h-4" /> Aksam
          </button>
        </div>

        {/* Today's routine */}
        {todayEntry ? (
          <div className="space-y-4">
            {/* Progress */}
            <div className="glass-strong rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Ilerleme
                </span>
                <span className="text-sm text-gray-400">
                  {completedCount}/{totalCount}
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sage-400 to-sage-300 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {progress === 100 && (
                <div className="flex items-center gap-2 mt-3 text-sage-600 text-sm">
                  <Sparkles className="w-4 h-4" />
                  Harika! Bugunun rutinini tamamladin!
                </div>
              )}
            </div>

            {/* Steps */}
            <div className="space-y-2">
              {todayEntry.steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${
                    step.completed
                      ? "glass-strong opacity-60"
                      : "glass-strong hover:bg-white/90"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      step.completed
                        ? "bg-sage-400 border-sage-400"
                        : "border-gray-300"
                    }`}
                  >
                    {step.completed && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span
                    className={`font-medium text-sm ${
                      step.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {step.name}
                  </span>
                  {step.product && (
                    <span className="text-xs text-gray-400 ml-auto">
                      {step.product}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Skin feeling */}
            <div className="glass-strong rounded-2xl p-5">
              <div className="text-sm font-medium text-gray-700 mb-3">
                Cildin nasil hissediyor?
              </div>
              <div className="flex justify-center gap-4">
                {[
                  { value: 1, icon: <Frown className="w-7 h-7" />, label: "Kotu" },
                  { value: 2, icon: <Meh className="w-7 h-7" />, label: "Eh" },
                  { value: 3, icon: <Smile className="w-7 h-7" />, label: "Iyi" },
                  { value: 4, icon: <Sparkles className="w-7 h-7" />, label: "Harika" },
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => updateFeeling(f.value)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
                      todayEntry.skinFeeling === f.value
                        ? "bg-blush-50 text-blush-500 scale-110"
                        : "text-gray-300 hover:text-gray-400"
                    }`}
                  >
                    {f.icon}
                    <span className="text-xs">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="glass-strong rounded-2xl p-5">
              <div className="text-sm font-medium text-gray-700 mb-2">Notlar</div>
              <textarea
                value={todayEntry.notes}
                onChange={(e) => updateNotes(e.target.value)}
                placeholder="Bugun cildinle ilgili bir not ekle..."
                className="w-full bg-transparent text-sm text-gray-600 placeholder:text-gray-300 outline-none resize-none h-20"
              />
            </div>
          </div>
        ) : (
          <div className="glass-strong rounded-3xl p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center mx-auto mb-4">
              {activeTab === "morning" ? (
                <Sun className="w-7 h-7 text-sage-500" />
              ) : (
                <Moon className="w-7 h-7 text-indigo-400" />
              )}
            </div>
            <h3 className="font-display font-semibold text-gray-900 mb-2">
              {activeTab === "morning" ? "Sabah" : "Aksam"} Rutini
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Bugunun {activeTab === "morning" ? "sabah" : "aksam"} rutinini henuz baslatmadin.
            </p>
            <button
              onClick={startRoutine}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sage-400 to-sage-300 text-white font-medium hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Rutini Baslat
            </button>
          </div>
        )}

        {/* History */}
        {pastEntries.length > 0 && (
          <div className="mt-8">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between p-4 glass-strong rounded-2xl mb-4"
            >
              <span className="font-medium text-gray-700 text-sm">
                Gecmis Rutinler ({pastEntries.length})
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  showHistory ? "rotate-180" : ""
                }`}
              />
            </button>

            {showHistory && (
              <div className="space-y-2">
                {pastEntries.map((entry) => {
                  const done = entry.steps.filter((s) => s.completed).length;
                  const total = entry.steps.length;
                  return (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 glass rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        {entry.timeOfDay === "morning" ? (
                          <Sun className="w-4 h-4 text-glow-400" />
                        ) : (
                          <Moon className="w-4 h-4 text-indigo-400" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            {new Date(entry.date).toLocaleDateString("tr-TR", {
                              day: "numeric",
                              month: "long",
                            })}
                          </div>
                          <div className="text-xs text-gray-400">
                            {done}/{total} adim tamamlandi
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="p-2 rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
