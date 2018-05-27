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
          title="PERFORMANCE AND PROJECT MANAGEMENT"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The Performance and Project Management (PPM) scale score reflects Uklid
          Yeesarapat's ability  to handle work, lead projects, and manage the performance of others and he."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="LEADERSHIP AND ORGANIZATIONAL MANAGEMEN"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The Leadership and Organizational Management (LOM) scale score measures how
          good Uklid Yeesarapat is at developing goals and strategies, delegating tasks, and
          motivating others to achieve them."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="COMMUNICATION, PERSUASION AND NEGOTIATION"
          score="40"
          firstColor="green"
          secondColor="lightgreen"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The Communication. Persuasion and Negotiation (CPN) scale score provides a gauge
          of Uklid Yeesarapat's ability to communicate, convince and deal effectively with
        supervisors co-workers, and subordlinates, as well as people outside the company"
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="PEOPLE AND INTERPERSONAL SKILLS"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The people and interpersonal skills (PIS) scale score indicates one's ability to interact
          and coperate with other, both individualy in group, in professional situaltions"
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="POLITICAL AND CULTURAL SKILLS"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The Political and Cultural Skills (PCS) scale score measures Uklid Yeesarapat's ability
          to adjust to different people and situations, as well as #posPronoun openness to
          change and to considerable variety in the workplace."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="PRODUCTIVITY AND EFFECTIVENESS AT WORK"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="The Productivity and Effectiveness at Work (PEW) scale score measures Uklid
          Yeesarapat's positive and productive behavors, as well as how one avoids behaviors
        and attitudes that negatively impact job performance."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="SELF-MANAGEMENT MOTIVATION AND CONTROL"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="TThe Self-management, Motivation and Control (SMC) scale score is an indicator of a person's emotional intelligence (EQ) and related qualities, such as self-control,
          persistence, initiative, and stress tolerance."
        />
      </Grid>
      <Grid item xs={3}>

      </Grid>
      <Grid item xs={10}>
        <GreyWrapper>
          <h4>Work Preferences</h4>
          <p style={{ fontSize: 12 }}>
            Work preferences measure the candidate 's interest profile.
             Our wark preferences profiler masures the candidate's job interest in six
             dimensions and determines whetner it matches the interest proflie required
             to enjoy and succeed in the job
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
          title="PHYSICAL, PRACTICAL AND MECHANICAL"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="People who prefer Physical, Practical and Mechanica typically like work activities that
          include practical, hands-on problems and solutions. They will enioy working outside, in jobs that do not involve a lot of paperwork or much interaction with others."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="INTELLECTUAL, ANALYTICAL AND METHODOLOGICAL"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="People who are Intellectual. Analytical and Methodological prefer occupations that
          frequently involve working with ideas and require an extensive amount of thinking.They will enjoy processing information, facts and figuring out problems mentally."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="CREATIVE, INNOVATIVE AND IMAGINATIVE"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="People who are Creative. Innovative and lmaginative prefer 
          jobs that give them room to let fly of their original self, and avoid orderad or
          repetitive acdles at all cost. They will enjoy work that can be done without lo
          following a set a clear set of rules."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="INTERPERSONAL, COOPERATIVE AND HUMANISTIC"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="People who are Interpersonal, Cooperative and Humanistic typically like to interact,
          educate and do things that help people, like teaching, nursing, or protecting. They will
          enjoy jobs that involve helping or providing seivice to others."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="PERSUASIVE, ADVENTUROUS AND MOTIVATIONAL"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="People who are Persuasive. Adventurous and Motivational like to lead and persuade
          people and to sell things or ideas.They will enjoy positions that frequently involve starting up 
          and carrying out projects, making important decisions, and leading others."
        />
      </Grid>
      <Grid item xs={3}>
        <CardWithStatus
          title="CONSCIENTIOUS, EFFICIENT AND ORDERLY"
          score="70"
          firstColor="green"
          secondColor="green"
          firstTitle="HIGH"
          secondTitle="WATCH"
          description="People who are Conscientious, Efficient and Orderly like to wok with numbers,
          records, or machines in a set, orderly, and clearly laid out way, following strict
          procedures and routines. They wil enioy working with data and details more than with ideas."
        />
      </Grid>
      <Grid container spacing={8} style={{ margin: 0 }}>
        <Grid item xs={12}>
          <H4>Itemized Score Report</H4>
        </Grid>
        <Grid item xs={6}>
          <Radar
            data={data}
            height={170}
            options={
              {
                scale: {
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 20,
                  },
                  pointLabels: {
                    fontSize: 14
                  },
                },
                legend: {
                  display: false
                },
              }
            }
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
          height={170}
          options={
            {
              scale: {
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: 100,
                  stepSize: 20,
                },
                pointLabels: {
                  fontSize: 14
                },
              },
              legend: {
                display: false
              },
            }
          }
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
  </React.Fragment >
)