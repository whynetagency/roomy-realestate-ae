export interface IRoomDetails {
  id: string,
  title: string,
  price: number,
  shortDescription: string[],
  description: string,
  facilities: string[],
  review: [
    {
      name: string,
      date: string,
      rate: number,
      text: string
    }
  ],
  areaDescription: string,
  coords: {
    lat: number,
    lng: number
  },
  nearby: string[]
}
