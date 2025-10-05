import admin from 'firebase-admin'
import fs from 'node:fs'

const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
if (!keyPath || !fs.existsSync(keyPath)) {
  console.error('Set GOOGLE_APPLICATION_CREDENTIALS env pointing to your service account JSON.')
  process.exit(1)
}
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(fs.readFileSync(keyPath, 'utf-8'))) })

const email = process.argv[2]
if (!email) {
  console.error('Usage: node scripts/set-admin-claim.mjs user@example.com')
  process.exit(1)
}

async function main() {
  const user = await admin.auth().getUserByEmail(email)
  await admin.auth().setCustomUserClaims(user.uid, { role: 'ADMIN' })
  console.log('Assigned ADMIN role to', email)
}
main().catch(console.error)
