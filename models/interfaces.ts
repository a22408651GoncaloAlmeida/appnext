export interface Rating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

export interface Pais {
  name: {
    common: string
    official: string
    nativeName: {
      eng: {
        official: string
        common: string  
      }
    }
  }
  area: number
  population: number
}