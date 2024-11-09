'use client'
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Initialiser le mode sombre en fonction des préférences du système ou de la dernière préférence enregistrée
    const savedMode = localStorage.getItem('darkMode') === 'true'
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(savedMode || systemPrefersDark)
    document.documentElement.classList.toggle('dark', savedMode || systemPrefersDark)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark', !isDarkMode)
    localStorage.setItem('darkMode', !isDarkMode)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 mt-[80px]">
      <header className="py-8 text-center">
        <h1 className="text-2xl font-bold">TSRP - Tickets - Supports - Repports - Productivité</h1>
      </header>

      <section className="h-full w-full md:pt-16 mt-[-40px] relative flex items-center justify-center flex-col">
        {/* Background */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
       
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-7xl font-bold text-center md:text-[200px]">
            TSR
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-40px]">
          <Image
            src={'/assets/preview.png'}
            alt="Illustration de la plateforme TSR"
            height={600}
            width={600}
            className="rounded-md shadow-md border dark:border-gray-600"
          />
        </div>
      </section>

      <section className="flex justify-center items-center flex-col gap-4 md:mt-16 mt-[-20px]">
        <h2 className="text-3xl text-center">Fonctionnalités principales</h2>
        <p className="text-center text-gray-700 dark:text-gray-300">
          TSR est une plateforme interne sécurisée conçue pour simplifier la gestion des stocks, l'analyse des ventes, et la gestion du support et de la formation pour plusieurs sociétés.
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {/* Cartes de fonctionnalités */}
          <Card className="w-[300px] flex flex-col justify-between bg-white dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Gestion des Stocks</CardTitle>
              <CardDescription>
                Centralisez et organisez les données de stock pour plusieurs entités.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Suivi des stocks en temps réel</li>
                <li>Gestion multi-sociétés</li>
                <li>Contrôle des mouvements de stock</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="w-[300px] flex flex-col justify-between bg-white dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Rapports de Vente</CardTitle>
              <CardDescription>
                Générez des rapports de ventes détaillés pour une prise de décision éclairée.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Rapports personnalisés</li>
                <li>Comparaison multi-entités</li>
                <li>Exportation en PDF et Excel</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="w-[300px] flex flex-col justify-between bg-white dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Analyse de Données</CardTitle>
              <CardDescription>
                Obtenez des insights grâce à des analyses de données en temps réel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Tableaux de bord interactifs</li>
                <li>Indicateurs de performance (KPI)</li>
                <li>Analyse des tendances</li>
              </ul>
            </CardContent>
          </Card>

          {/* Nouvelle carte pour la gestion des tickets de support et des formations */}
          <Card className="w-[300px] flex flex-col justify-between bg-white dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Support et Formation</CardTitle>
              <CardDescription>
                Gérez les tickets de support et accédez à des formations dédiées pour les employés.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Système de tickets de support</li>
                <li>Accès aux formations et tutoriels</li>
                <li>Suivi des demandes et historique</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Link
          href="/contact"
          className="mt-10 px-6 py-3 bg-primary text-white rounded-md text-lg"
        >
          Contactez-nous pour en savoir plus
        </Link>
      </section>

      <footer className="mt-12 text-gray-500 dark:text-gray-400 text-sm text-center">
        <p>© {new Date().getFullYear()} TSR - RH PRO service NC - usage interne uniquement.</p>
      </footer>
    </div>
  )
}
