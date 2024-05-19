import {Card, CardContent, Typography, Link} from '@mui/material'

const BobaInfo = ({name, address, location, place_id, rating}) => {
  return (
    <Card style={{margin: '10px', width: '600px', height: '200px'}}>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">{address}</Typography>
        <Typography variant="body2">Rating: {rating}</Typography>
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${location.lat}%2C${location.lng}&query_place_id=${place_id}`}
          target="_blank"
        >
          Get directions
        </Link>
      </CardContent>
    </Card>
  )
}

export default BobaInfo
