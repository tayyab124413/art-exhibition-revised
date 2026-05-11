import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  img: string
  qty: number
}

interface CartContextType {
  cart: CartItem[]
  cartCount: number
  addToCart: (id: string, name: string, price: number, img: string) => void
  removeFromCart: (id: string) => void
  changeQty: (id: string, delta: number) => void
  clearCart: () => void
  checkoutCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('ae_cart') || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('ae_cart', JSON.stringify(cart))
  }, [cart])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const addToCart = useCallback((id: string, name: string, price: number, img: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id)
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { id, name, price, img, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const changeQty = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const checkoutCart = useCallback(() => {
    setCart([])
  }, [])

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, changeQty, clearCart, checkoutCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
