import checkActivityRuleBreak from './activityrule.break'
import checkIntervalBreak from './interval.break'
import checkSceduledBreak from './scheduled.break'

export default function checkBreak(){
    checkActivityRuleBreak()
    checkIntervalBreak()
    checkSceduledBreak()
}