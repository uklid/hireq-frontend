import React from 'react'
import Grid from 'material-ui/Grid'
import { Card } from 'antd'
import styled from 'styled-components'
import IsoWidgetsWrapper from '../../containers/Widgets/widgets-wrapper'
import StickerWidget from '../../containers/Widgets/sticker/sticker-widget'
import CardWithStatus from './components/CardWithStatus'
import { Radar } from 'react-chartjs-2'
import { data } from './data'
import CardWithPowerBar from './components/CardWithPowerBar';
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

const H4 = styled.div`
  padding: 4px;
  border-radius: 4px;
  background-color: lightblue;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`

const moreStyle = {
  width: 200,
  height: 50,
  fontSize: 12,
  fontWeight: 300
}

export default () => (
  <React.Fragment>
    <Grid style={{ backgroundColor: '#eee' }} container spacing={8}>
      <Grid item xs={12}>
        <H4>Sumary of Q-Score Result</H4>
      </Grid>
      <Grid item xs={8} style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <IsoWidgetsWrapper
          width='32%'
        >
          <StickerWidget
            number="90%"
            text="Cognative Ability"
            icon="ion-ios-infinite"
            fontColor="#ffffff"
            bgColor="#006C3D"
            iconSize={28}
          />
        </IsoWidgetsWrapper>
        <IsoWidgetsWrapper
          width='32%'
        >
          <StickerWidget
            number="70%"
            text="Critical SoftSkills"
            icon="ion-ios-list-outline"
            fontColor="#ffffff"
            bgColor="#9f9502"
            iconSize={28}
          />
        </IsoWidgetsWrapper>
        <IsoWidgetsWrapper
          width='32%'
        >
          <StickerWidget
            number="40%"
            text="Work Preference"
            icon="ion-ios-heart-outline"
            fontColor="#ffffff"
            bgColor="#41772D"
            iconSize={28}
          />
        </IsoWidgetsWrapper>
      </Grid>
      <Grid item xs={4}>
        <IsoWidgetsWrapper>
          <StickerWidget
            number="86%"
            text="Total Q-Score"
            icon="ion-trophy"
            fontColor="#ffffff"
            bgColor="#41772D"
            iconSize={28}
          />
        </IsoWidgetsWrapper>
      </Grid>
      <Grid item xs={12}>
        <H4>Pitchaya Sumary Q-score overview</H4>
      </Grid>
      <Grid item xs={8}>
        <GreyWrapper>
          <h4>Cognitive Ability</h4>
          <p style={{ fontSize: 12 }}>
            Cognitive ability is brain-base skills that candidate need to carry out work task.
              It difines the mechanism of how people learn solve problems, and make dicisions.
              It relates to many essential functions of the brain such as memory, perception, attension
              , and visual and spatial processing.
          </p>
        </GreyWrapper>
      </Grid>
      <Grid item xs={2}>
        <IsoWidgetsWrapper>
          <StickerWidget
            number="80"
            text="PERFECT"
            oneSideColor
            // icon="ion-chatbubbles"
            fontColor="#ABB1BE"
            bgColor="#41772D"
          />
        </IsoWidgetsWrapper>
      </Grid>
      <Grid item xs={2}>
        <IsoWidgetsWrapper>
          <StickerWidget
            number="80"
            text="HIGHT"
            oneSideColor
            // icon="ion-chatbubbles"
            fontColor="#ABB1BE"
            bgColor="#41772D"
          />
        </IsoWidgetsWrapper>
      </Grid>
      <Grid item xs={4}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid container spacing={8} style={{ margin: 0 }}>
        <Grid item xs={8}>
          <GreyWrapper>
            <h4>Critical Softskills</h4>
            <p style={{ fontSize: 12 }}>
              Cognitive ability is brain-base skills that candidate need to carry out work task.
              It difines the mechanism of how people learn solve problems, and make dicisions.
              It relates to many essential functions of the brain such as memory, perception, attension
              , and visual and spatial processing.
          </p>
          </GreyWrapper>
        </Grid>
        <Grid item xs={2}>
          <IsoWidgetsWrapper>
            <StickerWidget
              number="80"
              text="PERFECT"
              oneSideColor
              // icon="ion-chatbubbles"
              fontColor="#ABB1BE"
              bgColor="#41772D"
            />
          </IsoWidgetsWrapper>
        </Grid>
        <Grid item xs={2}>
          <IsoWidgetsWrapper>
            <StickerWidget
              number="80"
              text="HIGHT"
              oneSideColor
              // icon="ion-chatbubbles"
              fontColor="#ABB1BE"
              bgColor="#41772D"
            />
          </IsoWidgetsWrapper>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>

      </Grid>
      <Grid item xs={10}>
        <GreyWrapper>
          <h4>Critical Softskills</h4>
          <p style={{ fontSize: 12 }}>
            Cognitive ability is brain-base skills that candidate need to carry out work task.
              It difines the mechanism of how people learn solve problems, and make dicisions.
              It relates to many essential functions of the brain such as memory, perception, attension
              , and visual and spatial processing.
          </p>
        </GreyWrapper>
      </Grid>
      <Grid item xs={2}>
        <IsoWidgetsWrapper>
          <StickerWidget
            number="80"
            text="PERFECT"
            oneSideColor
            // icon="ion-chatbubbles"
            fontColor="#ABB1BE"
            bgColor="#41772D"
          />
        </IsoWidgetsWrapper>
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The General Intelligence and Learning Ability (GIL) scale score reflects Uklid
          Yeesarapat's global intelligence and capacity to reason, solve problems, and learn new
        skills and abilities in new situations."
        />
      </Grid>
      <Grid container spacing={8} style={{ margin: 0 }}>
        <Grid item xs={12}>
          <H4>Itemized Score Report</H4>
        </Grid>
        <Grid item xs={6}>
          <Radar
            data={data}
            height={140}
          />
        </Grid>
        <Grid item xs={6}>
          <GreyWrapper>
            <h4>Critical Softskills</h4>
            <p style={{ fontSize: 12 }}>
              Cognitive ability is brain-base skills that candidate need to carry out work task.
              It difines the mechanism of how people learn solve problems, and make dicisions.
              It relates to many essential functions of the brain such as memory, perception, attension
              , and visual and spatial processing.
            </p>
          </GreyWrapper>
        </Grid>
      </Grid>
      {/* Card with power */}
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={90}
          min={60}
          score={75}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={78}
          min={46}
          score={90}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={80}
          min={20}
          score={40}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={78}
          min={46}
          score={90}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={40}
          min={10}
          score={60}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={100}
          min={80}
          score={30}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={40}
          min={10}
          score={60}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={100}
          min={80}
          score={30}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      {/* End card with power bar */}
      <Grid item xs={6}>
          <Radar
            data={data}
            height={140}
          />
        </Grid>
        <Grid item xs={6}>
          <GreyWrapper>
            <h4>Critical Softskills</h4>
            <p style={{ fontSize: 12 }}>
              Cognitive ability is brain-base skills that candidate need to carry out work task.
              It difines the mechanism of how people learn solve problems, and make dicisions.
              It relates to many essential functions of the brain such as memory, perception, attension
              , and visual and spatial processing.
            </p>
          </GreyWrapper>
        </Grid>
        <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={40}
          min={10}
          score={60}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={100}
          min={80}
          score={30}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={40}
          min={10}
          score={60}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={100}
          min={80}
          score={30}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={40}
          min={10}
          score={60}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
      <Grid item xs={6}>
        <CardWithPowerBar
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="MATCH"
          max={100}
          min={80}
          score={30}
          description="Cognitive ability is brain-base skills that candidate need to carry out work task.
          It difines the mechanism of how people learn solve problems, and make dicisions.
          It relates to many essential functions of the brain such as memory, perception, attension
          , and visual and spatial processing."
        />
      </Grid>
    </Grid>
    {/* <Grid style={{ backgroundColor: '#eee', marginTop: 30 }} container spacing={8}> */}

    {/* </Grid> */}
    {/*
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
                
                <StickerWidget
                  number="80"
                  text="PERFECT"
                  oneSideColor
                  // icon="ion-chatbubbles"
                  fontColor="#ABB1BE"
                  bgColor="#41772D"
                />
              </IsoWidgetsWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                
                <StickerWidget
                  number="80"
                  text="HIGHT"
                  oneSideColor
                  // icon="ion-chatbubbles"
                  fontColor="#ABB1BE"
                  bgColor="#41772D"
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
                
                <StickerWidget
                  number="80"
                  text="PERFECT"
                  oneSideColor
                  // icon="ion-chatbubbles"
                  fontColor="#ABB1BE"
                  bgColor="#9A670E"
                />
              </IsoWidgetsWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                
                <StickerWidget
                  number="80"
                  text="HIGHT"
                  oneSideColor
                  // icon="ion-chatbubbles"
                  fontColor="#ABB1BE"
                  bgColor="#9F9502"
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
                
                <StickerWidget
                  number="80"
                  text="PERFECT"
                  oneSideColor
                  // icon="ion-chatbubbles"
                  fontColor="#ABB1BE"
                  bgColor="#9A670E"
                />
              </IsoWidgetsWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                
                <StickerWidget
                  number="80"
                  text="HIGHT"
                  oneSideColor
                  // icon="ion-chatbubbles"
                  fontColor="#ABB1BE"
                  bgColor="#9F9502"
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
                
                <StickerWidget
                  number="80"
                  text="PERFECT"
                  oneSideColor
                  // icon="ion-chatbubbles"
                  fontColor="#ABB1BE"
                  bgColor="#9A670E"
                />
              </IsoWidgetsWrapper>
            </Grid>
            <Grid item sm={3}>
              <IsoWidgetsWrapper>
                
                <StickerWidget
                  number="80"
                  text="HIGHT"
                  oneSideColor
                  // icon="ion-chatbubbles"
                  fontColor="#ABB1BE"
                  bgColor="#9F9502"
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
        <CardWithStyled title="Report">
        <Grid style={{ marginTop: 10 }} container spacing={8}>
            <Grid item sm={6}>
          <Radar
            data={data}
            height={200}
          />
          </Grid>
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
          </Grid>
        </CardWithStyled>
      </Grid>
    </Grid> */}

  </React.Fragment >
)