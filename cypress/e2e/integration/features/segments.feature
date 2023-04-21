Feature: Segments actions

    @login    @seedData
    Scenario Outline: Create a new segment
        When I add a new segment, with "<segmentName>" and "<description>", create a new tag and the attribute "<language>" value
        Then I confirm that "<segmentName>" has been successfully added to the segments page, and check that the "<people>" result count is correct
        Examples:
            | segmentName        | description        | language | people |
            | Cypress_segments_1 | data_driven_test_1 | Spanish  | 3      |
            | Cypress_segments_2 | data_driven_test_2 | English  | 5      |

    @login
    Scenario Outline: Update an existing segment
        When I add a new segment, with "<segmentName>" and "<description>", create a new tag and the attribute "<language>" value
        Then I find specific segment with this "<segmentName>" then change attribute to "<differentLanguage>"
        And I verify that the that the "<people>" result count is correct and "<differentLanguage>" is the new attribute value
        Examples:
            | segmentName | description         | language | differentLanguage | people |
            | NewSegment  | This my description | English  | Portuguese        | 2      |
            | NewSegment2 | This my description | German   | Swedish           | 4      |

    @login
    Scenario Outline: Delete a segment
        When I add a new random segment, and "<description>", create a new tag add the attribute "<language>" value
        Then I find the new random segment and delete it from the list
        And I verify that the random segment was deleted
        Examples:
            | description         | language |
            | This my description | English  |

 #cypress ci trigger test
