import React from 'react'
import Grid from 'material-ui/Grid'
import { Card } from 'antd'
import styled from 'styled-components'
import IsoWidgetsWrapper from '../../containers/Widgets/widgets-wrapper'
import StickerWidget from '../../containers/Widgets/sticker/sticker-widget'
import CardWithStatus from './components/CardWithStatus'

const CardWithStyled = styled(Card) `
	.ant-card-head {
		background-color: lightblue;
	}
	.ant-card-body {
		background-color: #eee;
	}
`

const GreyWrapper = styled.div`
  padding: 15px;
  border-radius: 5px;
  background-color: rgba(0,0,0,0.1);
`

export default () => (
  <React.Fragment>
    <CardWithStyled id="reportCard" title="Sumary of Q-Score Result">
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <IsoWidgetsWrapper>
            {/* Sticker Widget */}
            <StickerWidget
              number="3024"
              text="Total Message"
              icon="ion-chatbubbles"
              fontColor="#ffffff"
              bgColor="#7ED320"
            />
          </IsoWidgetsWrapper>
        </Grid>
        <Grid item xs={3}>
          <IsoWidgetsWrapper>
            {/* Sticker Widget */}
            <StickerWidget
              number="3024"
              text="Total Message"
              icon="ion-chatbubbles"
              fontColor="#ffffff"
              bgColor="#7ED320"
            />
          </IsoWidgetsWrapper>
        </Grid>
        <Grid item xs={3}>
          <IsoWidgetsWrapper>
            {/* Sticker Widget */}
            <StickerWidget
              number="3024"
              text="Total Message"
              icon="ion-chatbubbles"
              fontColor="#ffffff"
              bgColor="#7ED320"
            />
          </IsoWidgetsWrapper>
        </Grid>
        <Grid item xs={3}>
          <IsoWidgetsWrapper>
            {/* Sticker Widget */}
            <StickerWidget
              number="3024"
              text="Total Message"
              icon="ion-chatbubbles"
              fontColor="#ffffff"
              bgColor="#7ED320"
            />
          </IsoWidgetsWrapper>
        </Grid>
      </Grid>
    </CardWithStyled>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <CardWithStyled title="Report">
          <Grid container spacing={8}>
            <Grid item sm={6}>
              <GreyWrapper>
                <h3>Lolem Ipsum</h3>
                <p>
                  Lolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem Ipsum
                </p>
              </GreyWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number="80"
                  text="PERFECT"
                  // icon="ion-chatbubbles"
                  fontColor="#ffffff"
                  bgColor="lightblue"
                />
              </IsoWidgetsWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number="80"
                  text="HIGHT"
                  // icon="ion-chatbubbles"
                  fontColor="#ffffff"
                  bgColor="lightblue"
                />
              </IsoWidgetsWrapper>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: 13 }} container spacing={24}>
            <Grid item sm={4} xs={4}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
          </Grid>
          <Grid style={{ marginTop: 10 }} container spacing={8}>
            <Grid item sm={6}>
              <GreyWrapper>
                <h3>Lolem Ipsum</h3>
                <p>
                  Lolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem Ipsum
                </p>
              </GreyWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number="80"
                  text="PERFECT"
                  // icon="ion-chatbubbles"
                  fontColor="#ffffff"
                  bgColor="lightblue"
                />
              </IsoWidgetsWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number="80"
                  text="HIGHT"
                  // icon="ion-chatbubbles"
                  fontColor="#ffffff"
                  bgColor="lightblue"
                />
              </IsoWidgetsWrapper>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: 10 }} container spacing={24}>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
                description="Lolem IpsumLolem IpsumLolem IpsumLolem IpsumLolem IpsumLolem IpsumLolem IpsumLolem IpsumLolem Ipsum"
              />
            </Grid>

          </Grid>
          <Grid container spacing={8}>
            <Grid item sm={6}>
              <GreyWrapper>
                <h3>Lolem Ipsum</h3>
                <p>
                  Lolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem Ipsum
                </p>
              </GreyWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number="80"
                  text="PERFECT"
                  // icon="ion-chatbubbles"
                  fontColor="#ffffff"
                  bgColor="lightblue"
                />
              </IsoWidgetsWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number="80"
                  text="HIGHT"
                  // icon="ion-chatbubbles"
                  fontColor="#ffffff"
                  bgColor="lightblue"
                />
              </IsoWidgetsWrapper>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: 13 }} container spacing={24}>
            <Grid item sm={4} xs={4}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
          </Grid>
          <Grid style={{ marginTop: 10 }} container spacing={8}>
            <Grid item sm={6}>
              <GreyWrapper>
                <h3>Lolem Ipsum</h3>
                <p>
                  Lolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem IpsumLolem IpsumLolem IpsumLolem
                  IpsumLolem Ipsum
                </p>
              </GreyWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number="80"
                  text="PERFECT"
                  // icon="ion-chatbubbles"
                  fontColor="#ffffff"
                  bgColor="lightblue"
                />
              </IsoWidgetsWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number="80"
                  text="HIGHT"
                  // icon="ion-chatbubbles"
                  fontColor="#ffffff"
                  bgColor="lightblue"
                />
              </IsoWidgetsWrapper>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: 10 }} container spacing={24}>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CardWithStatus
                title="General xxx"
                score="30"
                firstColor="green"
                secondColor="blue"
                firstTitle="WATCH"
                secondTitle="READ"
                description="Lolem IpsumLolem IpsumLolem IpsumLolem IpsumLolem IpsumLolem IpsumLolem IpsumLolem IpsumLolem Ipsum"
              />
            </Grid>
          </Grid>
        </CardWithStyled>
      </Grid>
    </Grid>
  </React.Fragment>
)