import { View } from 'react-native'
import Text from 'components/common/Text';
import React, { useEffect, useState } from 'react'
import StarRating from 'react-native-star-rating';
import { useTailwind } from 'tailwind-rn';

type props = {
    disabled?: boolean;
    isLabel?: boolean;
    isCount?: boolean;
    defaultRating?: number | undefined | null;
    ml?: number
    starSize?: number
}

const Rating = ({ disabled,  defaultRating, isLabel = true, isCount = true, ml = 7, starSize = 20 } : props) => {
    const tailwind = useTailwind()

    const [rating, setRating] = useState(0)

   const onStarRatingPress = (rating: number) => {
        setRating(rating)
    }

    useEffect(() => {
        setRating(rating)
    }, [defaultRating])

    return (
        <View>
            {isLabel && <Text left sm tertiary bold>Rating</Text>}
            <View style={tailwind('flex-row items-center mt-1')}>
                {isCount && <Text xBold lg left>{rating || defaultRating}</Text>}
                <StarRating
                    disabled={disabled}
                    maxStars={5}
                    starSize={starSize}
                    starStyle={{  marginLeft: ml }}
                    rating={ rating || defaultRating}
                    selectedStar={onStarRatingPress}
                    fullStarColor='#FCC736'
                />
            </View>
        </View>
    )
}

export default Rating