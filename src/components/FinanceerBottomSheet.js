import {BottomSheetBackdrop, BottomSheetModal} from "@gorhom/bottom-sheet";
import {StyleSheet} from "react-native";
import {theme} from "../../tailwind.config";
import {useMemo} from "react";

const FinanceerBottomSheet = ({intRef, children}) => {

    const snapPoints = useMemo(() => ["50"], []);

    return <BottomSheetModal handleStyle={styles.handleStyle} handleIndicatorStyle={styles.indicatorStyle}
                             ref={intRef}
                             snapPoints={snapPoints}
                             backgroundStyle={styles.backgroundStyle}
                             backdropComponent={(props) => (
                                 <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0}
                                                      opacity={0} {...props} />)}

    >
        {children}
    </BottomSheetModal>
}

const styles = StyleSheet.create({
    handleStyle: {
        borderTopColor: theme.extend.colors.primary,
        borderTopWidth: 1,
        backgroundColor: theme.extend.colors.neutral,
    }, indicatorStyle: {
        backgroundColor: theme.extend.colors.primary
    },
    backgroundStyle: {
        backgroundColor: theme.extend.colors.neutral
    }

});
export default FinanceerBottomSheet
