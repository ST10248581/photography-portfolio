import { WatermarkConfig } from '../models/photo.model';

// One switch for every watermark on the site — grid cards, group collages
// and the lightbox. Set `enabled: false` to remove them all.
export const WATERMARK: WatermarkConfig = {
  enabled: true,
  text: '© TK Photography',
  tileOpacity: 0.14,
  markOpacity: 0.75,
};
