import User from '@/components/user'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
   <div>
    <h1>Home</h1>
    <Link href='/admin'>Open My Admin</Link>
    <h2>CLient Session</h2>
    <User />
    <h2>Server Session</h2>
    {JSON.stringify(session)}
      </div>
  )
}
