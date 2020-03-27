import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

export default function Spinner(){
  return (
    <Grid>
    <Grid.Row columns={3}>
      <Grid.Column>
        {/* <Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
      </Grid.Column>
      <Grid.Column>
        <Image src='https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif' />
        <h1 className='center-text'>Fetching Recipes...</h1>
        {/* <Grid>
          <Grid.Row columns={3}>
            <Grid.Column></Grid.Column>
            <Grid.Column><h1>Fetching Recipes...</h1></Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid> */}
      </Grid.Column>
      <Grid.Column>
        {/* <Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
      </Grid.Column>
    </Grid.Row>
    </Grid>
  )
}