const Episode = ({ episode, name }) => (
  <p>
    {episode} {name}
  </p>
)

const EpisodeList = ({ episodes }) => {
  return (
    <div>
      {episodes.map(episode => (
        <Episode key={episode.key} {...episode} />
      ))}
    </div>
  )
}

export default EpisodeList
