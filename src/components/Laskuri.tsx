import React from "react"
import Tex2SVG from "react-hook-mathjax"
import { ILaskuri } from "../pages/Tab1"
import useCalculator from "../hooks/useCalculator"

const Laskuri: React.FC<LaskuriProps> = ({ laskuri, onLaskuriChange }) => {
  const { result, inputFields, onFieldChange } = useCalculator({
    laskuriId: laskuri.laskuriId,
    fields: laskuri.fields,
    variables: laskuri.variables,
    formula: laskuri.formula,
    onLaskuriChange: onLaskuriChange,
  })

  return (
    <>
      <br />
      <div>{`Laskuri ${laskuri.laskuriId}`}</div>
      <div>
        {" "}
        <Tex2SVG display="inline" latex={laskuri.formula} />
      </div>
      {inputFields.map((inputField) => (
        <input
          key={inputField.name}
          aria-label={inputField.name}
          type="number"
          value={inputField.currentValue || inputField.defaultValue}
          onChange={(e) =>
            onFieldChange(inputField.name, parseInt(e.target.value))
          }
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
