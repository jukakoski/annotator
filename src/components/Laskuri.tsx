import React, { useEffect, useState } from "react"
import Tex2SVG from "react-hook-mathjax"
import { parser } from "mathjs"
import { ILaskuri } from "../pages/Tab1"

const Laskuri: React.FC<LaskuriProps> = ({ laskuri, onLaskuriChange }) => {
  const [result, setResult] = useState(0)

  const { laskuriId } = laskuri

  // field names and default values
  const [fields, setFields] = useState(laskuri.fields)

  // calculate the result
  useEffect(() => {
    const p = parser()

    // create variables for the fields
    for (const field of fields) {
      p.set(field.name, field.currentValue || field.defaultValue)
    }

    // evaluate the formula
    const res = p.evaluate(laskuri.formula)

    setResult(res)
  }, [fields, laskuri.formula])

  useEffect(() => {
    onLaskuriChange(laskuriId, result)
  }, [result])

  const onFieldChange = (name: string, value: number) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.name === name ? { ...field, currentValue: value } : field
      )
    )
  }

  return (
    <>
      <br />
      <div>{`Laskuri ${laskuriId}`}</div>
      <div>
        {" "}
        <Tex2SVG display="inline" latex={laskuri.formula} />
      </div>
      {fields.map((field) => (
        <input
          key={field.name}
          aria-label={field.name}
          type="number"
          value={field.currentValue || field.defaultValue}
          onChange={(e) => onFieldChange(field.name, parseInt(e.target.value))}
        />
      ))}
      <div>{`Tulos: ${result}`}</div>
    </>
  )
}

export default Laskuri

interface LaskuriProps {
  laskuri: ILaskuri
  onLaskuriChange: (laskuriId: string, result: number) => void
}
