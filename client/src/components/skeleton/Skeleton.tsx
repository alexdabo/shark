import React from 'react'
import { Grid } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { CardHeader } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

interface Props {
  items?: number
}

export default (props: Props): JSX.Element => {
  const { items } = props
  let Skeletons: JSX.Element[] = []
  for (let i = 0; i < (items || 1); i++) {
    Skeletons.push(
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
        <Card>
          <CardHeader
            avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
            title={
              <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
        </Card>
      </Grid>
    )
  }

  return (
    <Grid data-testid="skeleton" container spacing={1}>
      {Skeletons}
    </Grid>
  )
}
