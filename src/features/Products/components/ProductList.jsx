import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';
import ProductListSkeleton from './ProductListSkeleton';


const ProductList = ({ data }) => {

    const loading = useSelector(state => state.loading)

    if (loading) return <ProductListSkeleton />

    return (
        <>
            <Box mt={4}>
                <Grid container spacing={2}>
                    {data?.map(product => {
                        return (
                            <Grid item key={product.id} xs={12} sm={6} md={3} lg={3}>
                                <Product product={product} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </>
    );
};


ProductList.propTypes = {
    data: PropTypes.array,
};

ProductList.defaultProps = {
}


export default ProductList;
