//This is a backup  for a SVG placeholder just in case the API doesn;t retrieve the pictures of the movies

//Placeholder for movies without a picture.
export function generatePlaceholderDataUrl(title: string): string {
  const svg = `
    <svg width="500" height="750" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="750" fill="#18181b"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="system-ui, sans-serif" 
        font-size="48" 
        font-weight="bold"
        fill="#f59e0b" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        🎬
      </text>
      <text 
        x="50%" 
        y="60%" 
        font-family="system-ui, sans-serif" 
        font-size="16" 
        fill="#71717a" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${title.substring(0, 20)}${title.length > 20 ? '...' : ''}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

//Runtime in minutes
export function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
}

//Format date into a format YY.MM.DD
export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

//Paragraph lenght truncated
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}