import React, { useEffect, useState } from "react"
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react"
import "./Tab1.css"
import Laskuri from "../components/Laskuri"

export interface ILaskuri {
  laskuriId: string
  fields: {
    name: string
    defaultValue: number
    currentValue?: number
  }[]
  variables: {
    name: string
    defaultValue: number
    currentValue?: number
  }[]
  formula: string
  result: number
}

const Tab1: React.FC = () => {
  // compined laskuri results
  const [laskurit, setLaskurit] = useState<ILaskuri[]>([])

  // initialising the laskurit array
  useEffect(() => {
    setLaskurit(
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((laskuriId) => ({
        laskuriId,
        formula: `(x + y + ${laskuriId}) * a`,
        result: 0,
        fields: [
          { name: "x", defaultValue: 0 },
          { name: "y", defaultValue: 0 },
        ],
        variables: [{ name: "a", defaultValue: 15 }],
      }))
    )
  }, [])

  const handleLaskuriChange = (laskuriId: string, result: number) => {
    // updating the result of the laskuri with the given laskuriId
    setLaskurit((prevLaskurit) =>
      prevLaskurit.map((laskuri) =>
        laskuri.laskuriId === laskuriId ? { ...laskuri, result } : laskuri
      )
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              {laskurit.map((laskuri) => (
                <Laskuri
                  key={laskuri.laskuriId}
                  laskuri={laskuri}
                  onLaskuriChange={handleLaskuriChange}
                />
              ))}
            </IonCol>
            <IonCol>
              <div>Yhteensä</div>
              <div>{laskurit.reduce((acc, { result }) => acc + result, 0)}</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Tab1
