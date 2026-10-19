const base = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };

export const BoltIcon = (p) => (
  <svg {...base} {...p}><path d="M13.5 2 4 14h6.5L9.5 22 20 9.5h-6.8L13.5 2Z" /></svg>
);
export const SparkIcon = (p) => (
  <svg {...base} {...p}><path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Zm7 12 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" /></svg>
);
export const ShieldIcon = (p) => (
  <svg {...base} {...p}><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1.2 14.2L7.5 13l1.4-1.4 1.9 1.9 4.3-4.3 1.4 1.4-5.7 5.6Z" /></svg>
);
export const ChevronIcon = ({ dir = 'right', ...p }) => (
  <svg {...base} width="20" height="20" {...p} style={{ transform: dir === 'left' ? 'rotate(180deg)' : undefined }}>
    <path d="M9 5l7 7-7 7-1.8-1.8L12.4 12 7.2 6.8 9 5Z" />
  </svg>
);
