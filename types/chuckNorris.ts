export class ChuckNorrisFactData {
  constructor({
    icon_url,
    id,
    url,
    value,
  }: {
    icon_url: string;
    id: string;
    url: string;
    value: string;
  }) {
    this.icon_url = icon_url;
    this.id = id;
    this.url = url;
    this.value = value;
  }

  icon_url: string;
  id: string;
  url: string;
  value: string;
}
