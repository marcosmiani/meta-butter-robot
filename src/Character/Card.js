import * as React from 'react'
import styled from 'styled-components'
import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona'
/*
none = 0,
offline = 1,
online = 2,
away = 3,
dnd = 4,
blocked = 5,
busy = 6
*/
const StatusMap = {
  Alive: PersonaPresence.online,
  Dead: PersonaPresence.dnd,
  unknown: PersonaPresence.away
}

const DimentionPersona = styled(Persona)`
  width: 350px;
  margin: 16px;
`

const CharacterCard = ({ name, image, origin, location, species, status }) => {
  const characterInfo = {
    imageUrl: image,
    text: name,
    secondaryText: species,
    tertiaryText: origin.dimension,
    optionalText: location.dimension
  }

  return (
    <DimentionPersona
      {...characterInfo}
      size={PersonaSize.size120}
      presence={StatusMap[status]}
      imageAlt={name}
    />
  )
}

export default CharacterCard
