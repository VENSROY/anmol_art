import { useState, useEffect, useCallback } from "react";
import { getSiteConfig, saveSiteConfig } from "../../services/siteConfig.service";
import { invalidateSiteConfig } from "../../hooks/useSiteConfig";
import type { SiteConfig, ToastState } from "./types";

interface Props {
  showToast: (msg: string, type?: ToastState["type"]) => void;
}

type FieldGroup = {
  label: string;
  icon: string;
  fields: { key: string; label: string; placeholder: string; multiline?: boolean }[];
};

const FIELD_GROUPS: FieldGroup[] = [
  {
    label: "Contact Information",
    icon: "fa-address-card",
    fields: [
      { key: "phone",          label: "Phone Number",    placeholder: "+91 98280 37575" },
      { key: "whatsapp_number",label: "WhatsApp Number", placeholder: "919828037575 (no + or spaces)" },
      { key: "email",          label: "Email Address",   placeholder: "anmolart75@gmail.com" },
      { key: "address",        label: "Address",         placeholder: "Full address…", multiline: true },
      { key: "business_hours", label: "Business Hours",  placeholder: "Mon – Sun, 10:00 AM – 7:00 PM" },
    ],
  },
  {
    label: "Social Media",
    icon: "fa-share-nodes",
    fields: [
      { key: "instagram_url", label: "Instagram URL", placeholder: "https://www.instagram.com/anmolart_75" },
      { key: "facebook_url",  label: "Facebook URL",  placeholder: "https://www.facebook.com/…" },
    ],
  },
  {
    label: "Business Stats",
    icon: "fa-chart-simple",
    fields: [
      { key: "stat_designs",    label: "Designs Count",    placeholder: "5,000+" },
      { key: "stat_experience", label: "Experience",       placeholder: "20+ Yrs" },
      { key: "stat_countries",  label: "Countries Served", placeholder: "20+" },
      { key: "stat_artisans",   label: "Artisans",         placeholder: "100+" },
    ],
  },
  {
    label: "About Section",
    icon: "fa-circle-info",
    fields: [
      { key: "established_year", label: "Established Year", placeholder: "2006" },
      { key: "about_title",  label: "About Title", placeholder: "Preserving a Dying Heritage" },
      { key: "about_body_1", label: "About Paragraph 1", placeholder: "Founded in the heart of Rajasthan…", multiline: true },
      { key: "about_body_2", label: "About Paragraph 2", placeholder: "Each creation reflects…", multiline: true },
      { key: "about_body_3", label: "About Paragraph 3", placeholder: "Through ANMOL Art…", multiline: true },
    ],
  },
  {
    label: "Hero Section",
    icon: "fa-panorama",
    fields: [
      { key: "hero_badge",       label: "Hero Badge Text",       placeholder: "Est. 2006 · Jodhpur, Rajasthan" },
      { key: "hero_description", label: "Hero Description",      placeholder: "Discover the elegance…", multiline: true },
    ],
  },
  {
    label: "Footer & Collections",
    icon: "fa-layer-group",
    fields: [
      { key: "footer_description",    label: "Footer Description",      placeholder: "Preserving the royal heritage…", multiline: true },
      { key: "collections_quote",     label: "Collections Quote",        placeholder: "Your Imagination, Our Creation" },
      { key: "collections_quote_desc",label: "Collections Quote Detail", placeholder: "Can't find exactly what you're looking for?…", multiline: true },
    ],
  },
];

export default function SiteSettingsManager({ showToast }: Props) {
  const [config, setConfig]   = useState<SiteConfig>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [dirty, setDirty]     = useState<Set<string>>(new Set());

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      setConfig(await getSiteConfig());
    } catch (err) {
      console.error("[SiteSettingsManager] failed to load config", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  const handleChange = (key: string, value: string) => {
    setConfig((c) => ({ ...c, [key]: value }));
    setDirty((d) => new Set(d).add(key));
  };

  const saveAll = async () => {
    if (dirty.size === 0) return;
    setSaving(true);
    const changed: Record<string, string> = {};
    dirty.forEach((key) => { changed[key] = config[key] ?? ""; });
    try {
      await saveSiteConfig(changed);
      // Refresh the live public site so edits appear without a hard reload.
      invalidateSiteConfig();
      showToast(`Saved ${dirty.size} setting(s)!`);
      setDirty(new Set());
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Save failed";
      showToast("Save failed: " + msg, "error");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Save bar */}
      {dirty.size > 0 && (
        <div className="sticky top-20 z-30 bg-royal-maroon text-white px-6 py-3 rounded-2xl shadow-xl flex items-center justify-between">
          <p className="text-sm font-bold">
            <i className="fa-solid fa-circle-exclamation text-royal-gold mr-2" aria-hidden="true" />
            {dirty.size} unsaved change{dirty.size > 1 ? "s" : ""}
          </p>
          <button onClick={saveAll} disabled={saving}
            className="flex items-center gap-2 bg-royal-gold text-royal-maroon px-5 py-2 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-white transition disabled:opacity-40">
            {saving ? <div className="w-4 h-4 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" /> : <><i className="fa-solid fa-floppy-disk" aria-hidden="true" /> Save All</>}
          </button>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-16 flex justify-center">
          <div className="w-8 h-8 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        FIELD_GROUPS.map((group) => (
          <div key={group.label} className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
            <h3 className="font-serif text-xl font-bold text-royal-maroon mb-6 flex items-center gap-2">
              <i className={`fa-solid ${group.icon} text-royal-gold`} aria-hidden="true" />
              {group.label}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {group.fields.map((field) => (
                <label key={field.key} className={`block ${field.multiline ? "sm:col-span-2" : ""}`}>
                  <span className="label-text flex items-center gap-2">
                    {field.label}
                    {dirty.has(field.key) && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-royal-gold" title="Unsaved change" />
                    )}
                  </span>
                  {field.multiline ? (
                    <textarea
                      rows={3}
                      value={config[field.key] ?? ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="admin-input resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={config[field.key] ?? ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="admin-input"
                    />
                  )}
                </label>
              ))}
            </div>
          </div>
        ))
      )}

      {!loading && dirty.size > 0 && (
        <div className="flex justify-end">
          <button onClick={saveAll} disabled={saving}
            className="flex items-center gap-2 bg-royal-maroon text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-royal-gold hover:text-royal-maroon transition disabled:opacity-40">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><i className="fa-solid fa-floppy-disk" aria-hidden="true" /> Save All Changes</>}
          </button>
        </div>
      )}
    </div>
  );
}
