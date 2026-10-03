import type { SiteConfig } from "@/config/site";
import { home } from "@/content/home";

export function WorkshopDetails({ workshop }: { workshop: SiteConfig["workshop"] }) {
  const { labels, pending, format } = home.workshop;
  const rows = [
    [labels.format, format], [labels.city, workshop.city || pending],
    ...(workshop.venue ? [[labels.venue, workshop.venue]] : []),
    [labels.date, workshop.date || pending],
    ...(workshop.duration ? [[labels.duration, workshop.duration]] : []),
    ...(workshop.capacity ? [[labels.capacity, `${workshop.capacity} ${labels.seats}`]] : []),
  ];
  return <dl className="workshop-details">{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}
