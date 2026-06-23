import { useEffect, useMemo, useState } from 'react'
import { collection, limit as limitQuery, onSnapshot, orderBy as orderByQuery, query, QueryConstraint, where, WhereFilterOp } from 'firebase/firestore'
import { db } from '../lib/firebase'

type WhereTuple = [string, WhereFilterOp, unknown]
type OrderTuple = [string, 'asc' | 'desc']

interface Options {
  where?: WhereTuple[]
  orderBy?: OrderTuple[]
  limit?: number
  enabled?: boolean
}

export function useFirestoreCollection<T = unknown>(path: string, options: Options = {}) {
  const { where: whereClauses = [], orderBy: orderByClauses = [], limit, enabled = true } = options
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(!!enabled)
  const [error, setError] = useState<string | undefined>(undefined)

  const constraintsKey = useMemo(
    () => JSON.stringify({ whereClauses, orderByClauses, limit, enabled }),
    [whereClauses, orderByClauses, limit, enabled]
  )

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    const constraints: QueryConstraint[] = []
    whereClauses.forEach(([field, op, value]) => constraints.push(where(field, op, value)))
    orderByClauses.forEach(([field, direction]) => constraints.push(orderByQuery(field, direction)))
    if (limit) constraints.push(limitQuery(limit))

    const colRef = collection(db, path)
    const queryRef = constraints.length ? query(colRef, ...constraints) : colRef

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const next = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[]
        setData(next)
        setLoading(false)
      },
      (err) => {
        console.error('Firestore collection error', err)
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [path, constraintsKey])

  return { data, loading, error }
}

