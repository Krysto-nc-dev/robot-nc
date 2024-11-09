import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { db } from '@/lib/db'
import { CheckCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: {
    agencyId: string
  }
}

const LaunchPadPage = async ({ params }: Props) => {
  const agencyDetails = await db.agency.findUnique({
    where: { id: params.agencyId },
  })

  if (!agencyDetails) return

  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Commençons !</CardTitle>
            <CardDescription>
              Suivez les étapes ci-dessous pour configurer votre compte.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src="/appstore.png"
                  alt="logo de l'application"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Enregistrez le site comme raccourci sur votre appareil mobile</p>
              </div>
              <Button>Commencer</Button>
            </div>
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src={agencyDetails.agencyLogo}
                  alt="logo de l'agence"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Remplissez tous les détails de votre entreprise</p>
              </div>
              {allDetailsExist ? (
                <CheckCircleIcon
                  size={50}
                  className="text-primary p-2 flex-shrink-0"
                />
              ) : (
                <Link
                  className="bg-primary py-2 px-4 rounded-md text-white"
                  href={`/agency/${params.agencyId}/settings`}
                >
                  Commencer
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LaunchPadPage
