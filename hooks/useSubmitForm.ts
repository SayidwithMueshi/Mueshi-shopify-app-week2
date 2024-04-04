import { create } from 'zustand'

type Charity = {
  id: string
  name: string
}

type Product = {
    id: string
    title: string
    image: any
  }

interface SubmitFormStore {
  selectedProducts: Product[]
  selectedCharityNames: Charity[] // Array of selected charity names
  donationPercentage: string
  setSelectedCharityNames: (charities: Charity[]) => void
  setDonationPercentage: (percentage: string) => void
  setSelectedProducts: (products: Product []) => void
}

const useSubmitForm = create<SubmitFormStore>((set) => ({
  selectedProducts: [],
  selectedCharityNames: [],
  donationPercentage: '',
  setSelectedCharityNames: (selectedCharityNames) =>
    set({ selectedCharityNames }),
  setDonationPercentage: (donationPercentage) => set({ donationPercentage }),
  setSelectedProducts: (selectedProducts) => set({ selectedProducts }),
}))

export default useSubmitForm
