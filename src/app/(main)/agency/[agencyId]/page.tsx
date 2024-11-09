import CircleProgress from '@/components/global/circle-progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import { AreaChart } from '@tremor/react'
import {
  ClipboardIcon,
  Contact2,
  Goal,
  ShoppingCart,
} from 'lucide-react' // Suppression de l'import de DollarSign
import Link from 'next/link'
import React from 'react'

const Page = async ({ params }: { params: { agencyId: string } }) => {
  const currentYear = new Date().getFullYear()

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
  })

  if (!agencyDetails) return

  const subaccounts = await db.subAccount.findMany({
    where: {
      agencyId: params.agencyId,
    },
  })

  return (
    <div className="relative h-full">
      <h1 className="text-4xl">Tableau de bord</h1>
      <Separator className=" my-6" />
      <div className="flex flex-col gap-4 pb-6">
        <div className="flex gap-4 flex-col xl:!flex-row">
          <Card className="flex-1 relative">
            <CardHeader>
              <CardDescription>Revenus</CardDescription>
              <CardTitle className="text-4xl">€0.00</CardTitle>
              <small className="text-xs text-muted-foreground">
                Pour l'année {currentYear}
              </small>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Total des revenus générés.
            </CardContent>
          </Card>
          <Card className="flex-1 relative">
            <CardHeader>
              <CardDescription>Clients actifs</CardDescription>
              <CardTitle className="text-4xl">{subaccounts.length}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Représente le nombre de sous-comptes que vous possédez et gérez.
            </CardContent>
            <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
          <Card className="flex-1 relative">
            <CardHeader>
              <CardTitle>Objectif d'agence</CardTitle>
              <CardDescription>
                <p className="mt-2">
                  Représente le nombre de sous-comptes que vous souhaitez posséder et gérer.
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">
                    Actuel : {subaccounts.length}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    Objectif : {agencyDetails.goal}
                  </span>
                </div>
                <Progress
                  value={(subaccounts.length / agencyDetails.goal) * 100}
                />
              </div>
            </CardFooter>
            <Goal className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
        </div>
        <div className="flex gap-4 xl:!flex-row flex-col">
          <Card className="p-4 flex-1">
            <CardHeader>
              <CardTitle>Historique des transactions</CardTitle>
            </CardHeader>
            <AreaChart
              className="text-sm stroke-primary"
              data={[]} // Les données de transaction ne sont plus affichées
              index="created"
              categories={['amount_total']}
              colors={['primary']}
              yAxisWidth={30}
              showAnimation={true}
            />
          </Card>
          <Card className="xl:w-[400px] w-full">
            <CardHeader>
              <CardTitle>Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <CircleProgress
                value={0} // Valeur de conversion fictive
                description={
                  <>
                    <div className="flex flex-col">
                      Abandonné
                      <div className="flex gap-2">
                        <ShoppingCart className="text-rose-700" />
                        0
                      </div>
                    </div>
                    <div className="flex flex-col">
                      Panier gagné
                      <div className="flex gap-2">
                        <ShoppingCart className="text-emerald-700" />
                        0
                      </div>
                    </div>
                  </>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page
