type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
};

export default function CoreValueCard({ icon, title, description, index = 0 }: Props) {
  return (
    <div
      className="group relative bg-white border border-charcoal/8 rounded-2xl p-7
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Background number */}
      <span
        className="absolute -top-3 -right-1 font-display text-8xl font-bold text-charcoal/4
          select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        {index + 1}
      </span>

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-forest/8 flex items-center justify-center
        text-forest mb-5 group-hover:bg-forest group-hover:text-white transition-colors">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-earth text-xl mb-3">{title}</h3>

      {/* Description */}
      <p className="text-charcoal/65 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
