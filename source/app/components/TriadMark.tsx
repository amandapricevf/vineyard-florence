type TriadMarkProps = {
  index: 1 | 2 | 3;
  label?: string;
  className?: string;
};

/**
 * Three small triangles form one larger triangle. The active point identifies
 * the current step in a natural three-part progression: top, right, left.
 */
export function TriadMark({ index, label, className = "" }: TriadMarkProps) {
  const classes = ["triad-mark", label ? "triad-mark-labeled" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      data-step={index}
      {...(label ? { "aria-label": `Step ${index} of 3: ${label}` } : { "aria-hidden": true })}
    >
      <span className="triad-shape" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {label ? (
        <span className="triad-copy" aria-hidden="true">
          <b>0{index}</b>
          <em>{label}</em>
        </span>
      ) : null}
    </span>
  );
}
