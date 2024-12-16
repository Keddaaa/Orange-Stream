export function getImagePlaceholder(width: number, height: number, text?: string): string {
  return `https://via.placeholder.com/${width}x${height}/1F2937/FFFFFF?text=${encodeURIComponent(text || '')}`;
}

export function getAvatarPlaceholder(name: string, size: number = 200): string {
  const initials = name
    .split(/\s+/)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
    
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=${size}&background=1F2937&color=FFFFFF`;
}

export function optimizeImageUrl(url: string, width: number, height?: number): string {
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams({
      w: width.toString(),
      ...(height && { h: height.toString() }),
      fit: 'crop',
      auto: 'format',
    });
    return `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;
  }
  return url;
}